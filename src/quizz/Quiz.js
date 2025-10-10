import React, { useState, useRef } from 'react';
import { Card, Button, Radio, Checkbox, Input, Typography, Modal, Divider, Tag, Space, Popover, ConfigProvider } from 'antd';
import { UnorderedListOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { quizData } from './data';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// --- DATA KUIS DIMASUKKAN DI SINI ---

// Komponen untuk merender HTML dengan aman
const HTMLRenderer = ({ htmlString }) => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);

// Fungsi untuk menebalkan keywords pada pembahasan
const highlightKeywords = (text, keywords) => {
  if (!keywords || keywords.length === 0) {
    return text;
  }
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  return text.replace(regex, '<b>$1</b>');
};


const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  
  // State untuk menyimpan skor
  const [individualScores, setIndividualScores] = useState({});
  const [normalizedScore, setNormalizedScore] = useState(null);

  const questionRefs = useRef([]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const scrollToQuestion = (index) => {
    questionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const calculateScore = () => {
    // Validasi sebelum menghitung skor
    const unansweredQuestions = [];
    quizData.forEach((q, index) => {
      const userAnswer = userAnswers[q.id];
      const isAnswered = userAnswer !== undefined && userAnswer !== null && (Array.isArray(userAnswer) ? userAnswer.length > 0 : String(userAnswer).trim().length > 0);
      if (!isAnswered) {
        unansweredQuestions.push({ number: index + 1, index: index });
      }
    });

    if (unansweredQuestions.length > 0) {
      Modal.error({
        title: 'Ada Soal yang Belum Terisi',
        content: (
          <div>
            <p>Silakan jawab pertanyaan berikut sebelum melanjutkan:</p>
            <Space wrap>
              {unansweredQuestions.map(item => (
                <Button
                  key={item.number}
                  onClick={() => {
                    scrollToQuestion(item.index);
                    Modal.destroyAll();
                  }}
                >
                  Soal {item.number}
                </Button>
              ))}
            </Space>
          </div>
        ),
        okText: 'Mengerti',
      });
      return;
    }

    // --- LOGIKA SKORING BARU DENGAN NORMALISASI ---
    let totalRawScore = 0;
    let totalMaxScore = 0;
    const scoresByQuestion = {};

    quizData.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      let questionScore = 0;
      let questionMaxScore = 0;

      switch (q.type) {
        case 'multiple_choice':
          questionMaxScore = 1;
          if (userAnswer === q.answer) questionScore = 1;
          break;
        
        case 'multiple_select':
          questionMaxScore = 2;
          if (Array.isArray(userAnswer) && Array.isArray(q.answer)) {
            const sortedUserAnswer = [...userAnswer].sort();
            const sortedCorrectAnswer = [...q.answer].sort();
            if (JSON.stringify(sortedUserAnswer) === JSON.stringify(sortedCorrectAnswer)) {
              questionScore = 2;
            }
          }
          break;

        case 'multiple_true_false':
          questionMaxScore = q.statements.length * 0.5;
          let correctStatements = 0;
          if(userAnswer){
            q.statements.forEach((statement, index) => {
              if (userAnswer[index] !== undefined && userAnswer[index] === statement.answer) {
                correctStatements++;
              }
            });
          }
          questionScore = correctStatements * 0.5;
          break;

        case 'essay':
          questionMaxScore = q.maxScore || 5;
          let keywordCount = 0;
          if(userAnswer) {
            q.keywords.forEach(keyword => {
              if (userAnswer.toLowerCase().includes(keyword.toLowerCase())) {
                keywordCount++;
              }
            });
          }
          questionScore = (keywordCount / q.keywords.length) * questionMaxScore;
          break;
        default:
          break;
      }
      
      scoresByQuestion[q.id] = { score: questionScore, max: questionMaxScore };
      totalRawScore += questionScore;
      totalMaxScore += questionMaxScore;
    });
    
    // Normalisasi skor ke skala 100
    const normalized = (totalMaxScore > 0) ? (totalRawScore / totalMaxScore) * 100 : 0;

    setIndividualScores(scoresByQuestion);
    setNormalizedScore(normalized);
    setIsResultModalVisible(true);
  };
  
  const renderAnswerReview = (q) => {
    const userAnswer = userAnswers[q.id];
    let isCorrect = false;
    let correctAnswerDisplay = null;
    let userAnswerDisplay = userAnswer;
    const individualScoreData = individualScores[q.id] || { score: 0, max: 0 };
    const questionScore = individualScoreData.score;
    const maxScore = individualScoreData.max;

    switch (q.type) {
      case 'multiple_choice':
      case 'multiple_select':
        isCorrect = questionScore === maxScore;
        correctAnswerDisplay = q.type === 'multiple_choice' ? <HTMLRenderer htmlString={q.answer} /> : (
            <Space direction="vertical" size="small">{q.answer.map((ans, i) => <HTMLRenderer key={i} htmlString={`- ${ans}`} />)}</Space>
        );
        userAnswerDisplay = q.type === 'multiple_choice' ? (userAnswer ? <HTMLRenderer htmlString={userAnswer} /> : <Text type="secondary">Tidak dijawab</Text>) : (
            userAnswer && userAnswer.length > 0 ? (
                <Space direction="vertical" size="small">{userAnswer.map((ans, i) => <HTMLRenderer key={i} htmlString={`- ${ans}`} />)}</Space>
            ) : <Text type="secondary">Tidak dijawab</Text>
        );
        break;

      case 'multiple_true_false':
        isCorrect = questionScore === maxScore;
        correctAnswerDisplay = (
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {q.statements.map((stmt, i) => <li key={i}><HTMLRenderer htmlString={`${stmt.text} <b>(${stmt.answer ? 'Benar' : 'Salah'})</b>`} /></li>)}
          </ul>
        );
        userAnswerDisplay = userAnswer ? (
           <ul style={{ paddingLeft: 20, margin: 0 }}>
             {q.statements.map((stmt, i) => <li key={i}><HTMLRenderer htmlString={`${stmt.text} <b>(${userAnswer[i] !== undefined ? (userAnswer[i] ? 'Benar' : 'Salah') : 'Tidak dijawab'})</b>`} /></li>)}
           </ul>
        ) : <Text type="secondary">Tidak dijawab</Text>;
        break;

      case 'essay':
         return (
          <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text strong>Jawaban Anda:</Text>
                <Tag color="green">Skor: {questionScore.toFixed(1)}/{maxScore}</Tag>
            </div>
            <Paragraph type="secondary" style={{ fontStyle: 'italic', marginTop: '8px' }}>{userAnswer || "Tidak dijawab"}</Paragraph>
          </>
        );

      default:
        return null;
    }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <Space align="center">
                <Text strong>Jawaban Anda:</Text>
                {isCorrect ? <Tag icon={<CheckCircleFilled />} color="success">BENAR</Tag> : <Tag icon={<CloseCircleFilled />} color="error">SALAH</Tag>}
            </Space>
            <Tag color="green">Skor: {questionScore}/{maxScore}</Tag>
        </div>
        <div style={{ background: '#f0f2f5', padding: '8px 12px', borderRadius: '6px' }}>
            {userAnswerDisplay}
        </div>
        {!isCorrect && (
          <>
            <Text strong style={{ marginTop: '12px', display: 'block' }}>Jawaban Benar:</Text>
            <div style={{ background: '#e6f4ff', padding: '8px 12px', borderRadius: '6px', marginTop: '8px' }}>
                {correctAnswerDisplay}
            </div>
          </>
        )}
      </div>
    );
  };


  const renderQuestion = (q) => {
    switch (q.type) {
      case 'multiple_choice':
        return (
          <Radio.Group onChange={(e) => handleAnswerChange(q.id, e.target.value)} value={userAnswers[q.id]}>
            <Space direction="vertical">
              {q.options.map((option, index) => (
                <Radio key={index} value={option}>
                  <HTMLRenderer htmlString={option} />
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );
      case 'multiple_select':
        return (
          <Checkbox.Group style={{ width: '100%' }} onChange={(values) => handleAnswerChange(q.id, values)} value={userAnswers[q.id]}>
             <Space direction="vertical">
              {q.options.map((option, index) => (
                <Checkbox key={index} value={option}>
                  <HTMLRenderer htmlString={option} />
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        );
      case 'multiple_true_false':
        return (
          <Space direction="vertical" style={{ width: '100%' }}>
            {q.statements.map((statement, index) => (
              <Card key={index} size="small">
                <HTMLRenderer htmlString={statement.text} />
                <Radio.Group
                  style={{ marginTop: 8 }}
                  value={userAnswers[q.id] ? userAnswers[q.id][index] : undefined}
                  onChange={(e) => {
                    const currentAnswers = userAnswers[q.id] || {};
                    handleAnswerChange(q.id, { ...currentAnswers, [index]: e.target.value });
                  }}
                >
                  <Radio value={true}>Benar</Radio>
                  <Radio value={false}>Salah</Radio>
                </Radio.Group>
              </Card>
            ))}
          </Space>
        );
      case 'essay':
        return (
          <TextArea
            rows={4}
            placeholder="Ketik jawaban Anda di sini..."
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            value={userAnswers[q.id]}
          />
        );
      default:
        return null;
    }
  };
  
  const navigatorContent = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '250px' }}>
      {quizData.map((q, index) => {
        const userAnswer = userAnswers[q.id];
        const isAnswered = userAnswer !== undefined && userAnswer !== null && (Array.isArray(userAnswer) ? userAnswer.length > 0 : String(userAnswer).trim().length > 0);
        return (
          <Button
            key={q.id}
            type={isAnswered ? 'primary' : 'default'}
            shape="circle"
            onClick={() => {
              scrollToQuestion(index);
            }}
          >
            {index + 1}
          </Button>
        );
      })}
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#086A46',
        },
      }}
    >
      <>
        <style>{`
          .quiz-container {
            max-width: 800px;
            margin: auto;
            padding: 24px;
            padding-bottom: 120px;
            word-break: break-word;
          }
          .quiz-container img {
            max-width: 100%;
            height: auto;
          }
          @media (max-width: 600px) {
            .quiz-container {
              padding: 16px;
              padding-bottom: 100px;
            }
          }
          .ant-card-head-title {
            white-space: normal;
          }
        `}</style>
        <div className="quiz-container">
          <Title level={2}>Kuis Interaktif</Title>
          <Paragraph>Jawab semua pertanyaan di bawah ini dengan benar.</Paragraph>
          
          {quizData.map((q, index) => (
            <Card
              ref={(el) => (questionRefs.current[index] = el)}
              key={q.id}
              title={<HTMLRenderer htmlString={`<b>Soal ${index + 1}:</b> ${q.question}`} />}
              style={{ marginBottom: 24 }}
            >
              {renderQuestion(q)}
            </Card>
          ))}

          <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 10 }}>
            <Popover content={navigatorContent} title="Navigasi Soal" trigger="click" placement="topRight">
              <Button
                type="primary"
                shape="round"
                icon={<UnorderedListOutlined />}
                size="large"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              >
                Lihat Soal
              </Button>
            </Popover>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Button type="primary" size="large" onClick={calculateScore} block>
                Selesai & Lihat Hasil
            </Button>
          </div>

          <Modal
            title="Hasil Kuis Anda"
            open={isResultModalVisible}
            onOk={() => setIsResultModalVisible(false)}
            onCancel={() => setIsResultModalVisible(false)}
            width={700}
            footer={[ <Button key="back" onClick={() => setIsResultModalVisible(false)}>Tutup</Button> ]}
          >
            {normalizedScore !== null && (
              <>
                <Title level={3}>Skor Akhir: <Tag color="green">{normalizedScore.toFixed(0)}</Tag></Title>
                <Divider />
                <Title level={4}>Pembahasan Jawaban</Title>
                {quizData.map((q, index) => (
                  <Card key={q.id} style={{ marginBottom: 16 }}>
                    <p><b>Soal {index + 1}:</b></p>
                    <HTMLRenderer htmlString={q.question} />
                    <Divider style={{ margin: '12px 0' }}/>
                    
                    {renderAnswerReview(q)}
                    
                    <Divider style={{ margin: '12px 0' }}/>
                    <Text strong>Pembahasan:</Text>
                    <Paragraph type="secondary">
                      <HTMLRenderer htmlString={
                          q.type === 'essay' && q.keywords ? highlightKeywords(q.pembahasan, q.keywords) : q.pembahasan
                      } />
                    </Paragraph>
                  </Card>
                ))}
              </>
            )}
          </Modal>
        </div>
      </>
    </ConfigProvider>
  );
};

export default Quiz;


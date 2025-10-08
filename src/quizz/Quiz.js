import React, { useState } from 'react';
import { Card, Button, Radio, Checkbox, Input, Typography, Modal, Divider, Tag, Space } from 'antd';
import { quizData } from './data';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;



// Komponen untuk merender HTML dengan aman
const HTMLRenderer = ({ htmlString }) => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    quizData.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      if (!userAnswer) return;

      switch (q.type) {
        case 'multiple_choice':
          if (userAnswer === q.answer) totalScore += 10;
          break;
        
        // --- LOGIKA PENILAIAN BARU UNTUK MULTIPLE SELECT ---
        case 'multiple_select':
          if (Array.isArray(userAnswer) && Array.isArray(q.answer)) {
            // Urutkan kedua array untuk memastikan perbandingan yang konsisten
            const sortedUserAnswer = [...userAnswer].sort();
            const sortedCorrectAnswer = [...q.answer].sort();
            
            // Beri skor hanya jika semua jawaban yang benar dipilih dan tidak ada jawaban salah yang dipilih
            if (JSON.stringify(sortedUserAnswer) === JSON.stringify(sortedCorrectAnswer)) {
              totalScore += 10;
            }
          }
          break;

        case 'multiple_true_false':
          let correctStatements = 0;
          q.statements.forEach((statement, index) => {
            if (userAnswer[index] !== undefined && userAnswer[index] === statement.answer) {
              correctStatements++;
            }
          });
          totalScore += (correctStatements / q.statements.length) * 10;
          break;

        case 'essay':
          let keywordCount = 0;
          q.keywords.forEach(keyword => {
            if (userAnswer.toLowerCase().includes(keyword.toLowerCase())) {
              keywordCount++;
            }
          });
          totalScore += (keywordCount / q.keywords.length) * q.maxScore;
          break;
        default:
          break;
      }
    });
    setScore(Math.round(totalScore));
    setIsModalVisible(true);
  };

  const renderQuestion = (q) => {
    switch (q.type) {
      case 'multiple_choice':
        return (
          <Radio.Group onChange={(e) => handleAnswerChange(q.id, e.target.value)}>
            <Space direction="vertical">
              {q.options.map((option, index) => (
                <Radio key={index} value={option}>
                  <HTMLRenderer htmlString={option} />
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );

      // --- TAMPILAN BARU UNTUK SOAL MULTIPLE SELECT ---
      case 'multiple_select':
        return (
          <Checkbox.Group style={{ width: '100%' }} onChange={(values) => handleAnswerChange(q.id, values)}>
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: 'auto' }}>
      <Title level={2}>Kuis Interaktif</Title>
      <Paragraph>Jawab semua pertanyaan di bawah ini dengan benar.</Paragraph>
      
      {quizData.map((q, index) => (
        <Card
          key={q.id}
          title={<HTMLRenderer htmlString={`<b>Soal ${index + 1}:</b> ${q.question}`} />}
          style={{ marginBottom: 24 }}
        >
          {renderQuestion(q)}
        </Card>
      ))}

      <Button type="primary" size="large" block onClick={calculateScore}>
        Selesai & Lihat Hasil
      </Button>

      <Modal
        title="Hasil Kuis Anda"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Tutup
          </Button>,
        ]}
      >
        <Title level={3}>Skor Akhir: <Tag color="blue">{score}</Tag></Title>
        <Divider />
        <Title level={4}>Pembahasan</Title>
        {quizData.map((q, index) => (
          <Card key={q.id} style={{ marginBottom: 16 }}>
            <p><b>Soal {index + 1}:</b></p>
            <HTMLRenderer htmlString={q.question} />
            <Divider style={{ margin: '12px 0' }}/>
            <Text strong>Pembahasan:</Text>
            <Paragraph type="secondary">
                <HTMLRenderer htmlString={q.pembahasan} />
            </Paragraph>
          </Card>
        ))}
      </Modal>
    </div>
  );
};

export default Quiz;


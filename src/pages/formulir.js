import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Layout, Form, Input, Select, Button, Table, Modal, Spin, Card, Typography,
  Space, Divider, Row, Col, Alert, InputNumber, ConfigProvider, Tag, Empty
} from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

// --- DATA BUKU ---
  const bookData = [
        {
            category: "BSE - SD/MI",
            subsections: [
                {
                    title: "Buku Siswa",
                    books: [
                        { judul: "Bahasa Indonesia: Aku Bisa! untuk SD/MI 1", harga: 24500 },
                        { judul: "Bahasa Indonesia: Keluargaku Unik untuk SD/MI 2", harga: 22200 },
                        { judul: "Bahasa Indonesia: Kawan Seiring untuk SD/MI 3", harga: 23100 },
                        { judul: "Bahasa Indonesia: Lihat Sekitar untuk SD/MI 4", harga: 24500 },
                        { judul: "Bahasa Indonesia: Bergerak Bersama untuk SD/MI 5", harga: 23100 },
                        { judul: "Bahasa Indonesia: Anak-anak yang Mengubah Dunia untuk SD/MI 6", harga: 25000 },
                        { judul: "Bahasa Inggris My Next Words Grade 1", harga: 11500 },
                        { judul: "Bahasa Inggris My Next Words Grade 2", harga: 12200 },
                        { judul: "Bahasa Inggris My Next Words Grade 3", harga: 13500 },
                        { judul: "Bahasa Inggris My Next Words Grade 4", harga: 12200 },
                        { judul: "Bahasa Inggris My Next Words Grade 5", harga: 11100 },
                        { judul: "Bahasa Inggris My Next Words Grade 6", harga: 11600 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 3", harga: 23600 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 4", harga: 25000 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 5", harga: 26000 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 6", harga: 22200 },
                        { judul: "Matematika untuk SD/MI 1", harga: 26000 },
                        { judul: "Matematika untuk SD/MI 2", harga: 26500 },
                        { judul: "Matematika untuk SD/MI 3", harga: 23600 },
                        { judul: "Matematika untuk SD/MI 4", harga: 22200 },
                        { judul: "Matematika untuk SD/MI 5", harga: 31700 },
                        { judul: "Matematika untuk SD/MI 6", harga: 16500 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 1", harga: 21700 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 2", harga: 28800 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 3", harga: 27400 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 4", harga: 21700 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 5", harga: 27900 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 6", harga: 22200 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 1", harga: 69300 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 2", harga: 79500 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 3", harga: 69300 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 4", harga: 53900 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 5", harga: 74400 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 6", harga: 63600 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 1", harga: 63600 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 2", harga: 79500 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 3", harga: 63600 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 4", harga: 53900 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 5", harga: 59100 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 6", harga: 68700 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 1", harga: 119900 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 2", harga: 84000 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 3", harga: 110300 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 4", harga: 128200 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 5", harga: 102000 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 6", harga: 84000 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 1", harga: 137800 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 2", harga: 128900 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 3", harga: 128900 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 4", harga: 146800 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 5", harga: 137800 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 6", harga: 155800 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 1", harga: 137800 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 2", harga: 146800 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 3", harga: 146800 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 4", harga: 119900 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 5", harga: 128900 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 6", harga: 119300 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 1", harga: 101300 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 2", harga: 110900 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 3", harga: 84000 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 4", harga: 137200 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 5", harga: 110900 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 6", harga: 102000 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 1", harga: 20300 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 2", harga: 19400 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 3", harga: 20800 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 4", harga: 17900 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 5", harga: 19400 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 6", harga: 20800 },
                    ]
                },
                {
                    title: "Buku Guru",
                    books: [
                        { judul: "Bahasa Indonesia: Aku Bisa! untuk SD/MI 1", harga: 100000 },
                        { judul: "Bahasa Indonesia: Keluargaku Unik untuk SD/MI 2", harga: 99400 },
                        { judul: "Bahasa Indonesia: Kawan Seiring untuk SD/MI 3", harga: 94900 },
                        { judul: "Bahasa Indonesia: Lihat Sekitar untuk SD/MI 4", harga: 89200 },
                        { judul: "Bahasa Indonesia: Bergerak Bersama untuk SD/MI 5", harga: 105200 },
                        { judul: "Bahasa Indonesia: Anak-anak yang Mengubah Dunia untuk SD/MI 6", harga: 89200 },
                        { judul: "Bahasa Inggris My Next Words Grade 1", harga: 30300 },
                        { judul: "Bahasa Inggris My Next Words Grade 2", harga: 48600 },
                        { judul: "Bahasa Inggris My Next Words Grade 3", harga: 44500 },
                        { judul: "Bahasa Inggris My Next Words Grade 4", harga: 29800 },
                        { judul: "Bahasa Inggris My Next Words Grade 5", harga: 49100 },
                        { judul: "Bahasa Inggris My Next Words Grade 6", harga: 39400 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 3", harga: 89800 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 4", harga: 89200 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 5", harga: 99400 },
                        { judul: "Ilmu Pengetahuan Alam dan Sosial untuk SD/MI 6", harga: 94300 },
                        { judul: "Matematika untuk SD/MI 1", harga: 69300 },
                        { judul: "Matematika untuk SD/MI 2", harga: 68700 },
                        { judul: "Matematika untuk SD/MI 3", harga: 79500 },
                        { judul: "Matematika untuk SD/MI 4", harga: 89200 },
                        { judul: "Matematika untuk SD/MI 5", harga: 145500 },
                        { judul: "Matematika untuk SD/MI 6", harga: 53900 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 1", harga: 21700 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 2", harga: 100300 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 3", harga: 72800 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 4", harga: 91300 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 5", harga: 76800 },
                        { judul: "Pendidikan Agama Islam dan Budi Pekerti untuk SD/MI 6", harga: 53900 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 1", harga: 69300 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 2", harga: 164600 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 3", harga: 130700 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 4", harga: 121900 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 5", harga: 130800 },
                        { judul: "Pendidikan Agama Kristen dan Budi Pekerti untuk SD 6", harga: 131100 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 1", harga: 63600 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 2", harga: 96600 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 3", harga: 122500 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 4", harga: 139400 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 5", harga: 147500 },
                        { judul: "Pendidikan Agama Katolik dan Budi Pekerti untuk SD 6", harga: 131100 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 1", harga: 119900 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 2", harga: 113700 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 3", harga: 130700 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 4", harga: 121900 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 5", harga: 113300 },
                        { judul: "Pendidikan Agama Hindu dan Budi Pekerti untuk SD 6", harga: 122500 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 1", harga: 137800 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 2", harga: 147900 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 3", harga: 131100 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 4", harga: 147900 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 5", harga: 130800 },
                        { judul: "Pendidikan Agama Buddha dan Budi Pekerti untuk SD 6", harga: 114000 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 1", harga: 137800 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 2", harga: 105200 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 3", harga: 122500 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 4", harga: 139000 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 5", harga: 156100 },
                        { judul: "Pendidikan Agama Khonghucu dan Budi Pekerti untuk SD 6", harga: 113500 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 1", harga: 101300 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 2", harga: 137800 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 3", harga: 128900 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 4", harga: 155200 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 5", harga: 128200 },
                        { judul: "Pendidikan Kepercayaan terhadap Tuhan YME dan Budi Pekerti SD 6", harga: 137200 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 1", harga: 79500 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 2", harga: 84700 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 3", harga: 89800 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 4", harga: 69300 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 5", harga: 64200 },
                        { judul: "Pendidikan Pancasila Untuk SD/MI 6", harga: 89800 },
                        { judul: "Pendidikan Jasmani, Olahraga, dan Kesehatan SD/MI 1", harga: 89200 },
                        { judul: "Pendidikan Jasmani, Olahraga, dan Kesehatan SD/MI 2", harga: 94300 },
                        { judul: "Pendidikan Jasmani, Olahraga, dan Kesehatan SD/MI 3", harga: 94300 },
                        { judul: "Pendidikan Jasmani, Olahraga, dan Kesehatan SD/MI 4", harga: 94300 },
                        { judul: "Pendidikan Jasmani, Olahraga, dan Kesehatan SD/MI 5", harga: 104500 },
                        { judul: "Pendidikan Jasmani, Olahraga, dan Kesehatan SD/MI 6", harga: 104500 },
                        { judul: "Seni Musik untuk SD 1", harga: 59100 },
                        { judul: "Seni Musik untuk SD 2", harga: 84000 },
                        { judul: "Seni Musik untuk SD 3", harga: 69300 },
                        { judul: "Seni Musik untuk SD 4", harga: 64200 },
                        { judul: "Seni Musik untuk SD 5", harga: 64200 },
                        { judul: "Seni Musik untuk SD 6", harga: 58400 },
                        { judul: "Seni Rupa untuk SD 1", harga: 48200 },
                        { judul: "Seni Rupa untuk SD 2", harga: 43700 },
                        { judul: "Seni Rupa untuk SD 3", harga: 43700 },
                        { judul: "Seni Rupa untuk SD 4", harga: 43700 },
                        { judul: "Seni Rupa untuk SD 5", harga: 64200 },
                        { judul: "Seni Rupa untuk SD 6", harga: 89800 },
                        { judul: "Seni Tari untuk SD 1", harga: 74400 },
                        { judul: "Seni Tari untuk SD 2", harga: 84700 },
                        { judul: "Seni Tari untuk SD 3", harga: 68700 },
                        { judul: "Seni Tari untuk SD 4", harga: 89800 },
                        { judul: "Seni Tari untuk SD 5", harga: 99400 },
                        { judul: "Seni Tari untuk SD 6", harga: 100000 },
                        { judul: "Seni Teater untuk SD 1", harga: 64200 },
                        { judul: "Seni Teater untuk SD 2", harga: 53300 },
                        { judul: "Seni Teater untuk SD 3", harga: 84000 },
                        { judul: "Seni Teater untuk SD 4", harga: 73800 },
                        { judul: "Seni Teater untuk SD 5", harga: 89800 },
                        { judul: "Seni Teater untuk SD 6", harga: 64200 },
                    ]
                }
            ]
        },
      {

    category: "Erlangga SD",

    subsections: [{

        title: "Buku Siswa",

        books: [{

            judul: "Asesmen Notes (Revisi) 1a",

            harga: 75000

        }, {

            judul: "Asesmen Notes (Revisi) 1b",

            harga: 75000

        }, {

            judul: "Asesmen Notes (Revisi) 2a",

            harga: 75000

        }, {

            judul: "Asesmen Notes (Revisi) 2b",

            harga: 75000

        }, {

            judul: "BankSoal HOTS Sains 1",

            harga: 109000

        }, {

            judul: "BankSoal HOTS Sains 2",

            harga: 113000

        }, {

            judul: "BankSoal HOTS Sains 3",

            harga: 109000

        }, {

            judul: "BankSoal HOTS Sains 4",

            harga: 113000

        }, {

            judul: "Belajar Budaya Banyumasan 3",

            harga: 65000

        }, {

            judul: "Belajar Budaya Banyumasan 4",

            harga: 65000

        }, {

            judul: "Best Practice Guru SD/MI",

            harga: 114000

        }, {

            judul: "BIDIK: Bhineka Tunggal Ika 1",

            harga: 58000

        }, {

            judul: "BIDIK: Bhineka Tunggal Ika 2",

            harga: 60000

        }, {

            judul: "BIDIK: Bhineka Tunggal Ika 3",

            harga: 60000

        }, {

            judul: "BIDIK: Bhineka Tunggal Ika 4",

            harga: 55000

        }, {

            judul: "BIDIK: Bhineka Tunggal Ika 5",

            harga: 55000

        }, {

            judul: "BIDIK: Bhineka Tunggal Ika 6",

            harga: 55000

        }, {

            judul: "BIDIK P5: Gaya Hidup Berkelanjutan 1",

            harga: 58000

        }, {

            judul: "BIDIK P5: Gaya Hidup Berkelanjutan 2",

            harga: 60000

        }, {

            judul: "BIDIK P5: Gaya Hidup Berkelanjutan 3",

            harga: 48000

        }, {

            judul: "BIDIK P5: Gaya Hidup Berkelanjutan 4",

            harga: 55000

        }, {

            judul: "BIDIK P5: Gaya Hidup Berkelanjutan 5",

            harga: 55000

        }, {

            judul: "BIDIK P5: Gaya Hidup Berkelanjutan 6",

            harga: 53000

        }, {

            judul: "BIDIK P5: Kearifan Lokal 1",

            harga: 61000

        }, {

            judul: "BIDIK P5: Kearifan Lokal 2",

            harga: 56000

        }, {

            judul: "BIDIK P5: Kearifan Lokal 3",

            harga: 55000

        }, {

            judul: "BIDIK P5: Kearifan Lokal 4",

            harga: 55000

        }, {

            judul: "BIDIK P5: Kearifan Lokal 5",

            harga: 61000

        }, {

            judul: "BIDIK P5: Kearifan Lokal 6",

            harga: 53000

        }, {

            judul: "Bocah Jawa Kudu Pinter Basa Jawa",

            harga: 40000

        }, {

            judul: "Buku Soal/Kerja Matematika (Revisi) 4",

            harga: 115000

        }, {

            judul: "Buku Soal/Kerja Matematika (Revisi) 5",

            harga: 122000

        }, {

            judul: "Buku Soal/Kerja Matematika (Revisi) 6",

            harga: 113000

        }, {

            judul: "BUPENA Merdeka 1a",

            harga: 117000

        }, {

            judul: "BUPENA Merdeka 1b",

            harga: 118000

        }, {

            judul: "BUPENA Merdeka 1c",

            harga: 110000

        }, {

            judul: "BUPENA Merdeka 1d",

            harga: 120000

        }, {

            judul: "BUPENA Merdeka 2a",

            harga: 124000

        }, {

            judul: "BUPENA Merdeka 2b",

            harga: 128000

        }, {

            judul: "BUPENA Merdeka 2c",

            harga: 110000

        }, {

            judul: "BUPENA Merdeka 2d",

            harga: 110000

        }, {

            judul: "BUPENA Merdeka 3a",

            harga: 108000

        }, {

            judul: "BUPENA Merdeka 3b",

            harga: 121000

        }, {

            judul: "BUPENA Merdeka 3c",

            harga: 121000

        }, {

            judul: "BUPENA Merdeka 3d",

            harga: 99000

        }, {

            judul: "BUPENA Merdeka 4a",

            harga: 124000

        }, {

            judul: "BUPENA Merdeka 4b",

            harga: 127000

        }, {

            judul: "BUPENA Merdeka 4c",

            harga: 127000

        }, {

            judul: "BUPENA Merdeka 4d",

            harga: 132000

        }, {

            judul: "BUPENA Merdeka 5a",

            harga: 124000

        }, {

            judul: "BUPENA Merdeka 5b",

            harga: 109000

        }, {

            judul: "BUPENA Merdeka 5c",

            harga: 114000

        }, {

            judul: "BUPENA Merdeka 5d",

            harga: 104000

        }, {

            judul: "BUPENA Merdeka 6a",

            harga: 108000

        }, {

            judul: "BUPENA Merdeka 6b",

            harga: 127000

        }, {

            judul: "BUPENA Merdeka 6c",

            harga: 104000

        }, {

            judul: "BUPENA Merdeka 6d",

            harga: 101000

        }, {

            judul: "BUPENA Merdeka (Revisi) 1a",

            harga: 117000

        }, {

            judul: "BUPENA Merdeka (Revisi) 1b",

            harga: 118000

        }, {

            judul: "BUPENA Merdeka (Revisi) 1c",

            harga: 110000

        }, {

            judul: "BUPENA Merdeka (Revisi) 1d",

            harga: 120000

        }, {

            judul: "BUPENA Merdeka (Revisi) 2a",

            harga: 124000

        }, {

            judul: "BUPENA Merdeka (Revisi) 2b",

            harga: 128000

        }, {

            judul: "BUPENA Merdeka (Revisi) 2c",

            harga: 110000

        }, {

            judul: "BUPENA Merdeka (Revisi) 2d",

            harga: 110000

        }, {

            judul: "BUPENA Merdeka (Revisi) 3a",

            harga: 108000

        }, {

            judul: "BUPENA Merdeka (Revisi) 3b",

            harga: 121000

        }, {

            judul: "BUPENA Merdeka (Revisi) 3c",

            harga: 121000

        }, {

            judul: "BUPENA Merdeka (Revisi) 3d",

            harga: 99000

        }, {

            judul: "BUPENA Merdeka (Revisi) 4a",

            harga: 124000

        }, {

            judul: "BUPENA Merdeka (Revisi) 4b",

            harga: 127000

        }, {

            judul: "BUPENA Merdeka (Revisi) 4c",

            harga: 127000

        }, {

            judul: "BUPENA Merdeka (Revisi) 4d",

            harga: 132000

        }, {

            judul: "BUPENA Merdeka (Revisi) 5a",

            harga: 124000

        }, {

            judul: "BUPENA Merdeka (Revisi) 5b",

            harga: 109000

        }, {

            judul: "BUPENA Merdeka (Revisi) 5c",

            harga: 114000

        }, {

            judul: "BUPENA Merdeka (Revisi) 5d",

            harga: 104000

        }, {

            judul: "BUPENA Merdeka (Revisi) 6a",

            harga: 108000

        }, {

            judul: "BUPENA Merdeka (Revisi) 6b",

            harga: 127000

        }, {

            judul: "BUPENA Merdeka (Revisi) 6c",

            harga: 104000

        }, {

            judul: "BUPENA Merdeka (Revisi) 6d",

            harga: 101000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti 1",

            harga: 76000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti 2",

            harga: 71000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti 3",

            harga: 64000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti 4",

            harga: 74000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti 5",

            harga: 71000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti 6",

            harga: 62000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti (Revisi) 1",

            harga: 76000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti (Revisi) 2",

            harga: 71000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti (Revisi) 3",

            harga: 64000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti (Revisi) 4",

            harga: 74000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti (Revisi) 5",

            harga: 71000

        }, {

            judul: "BUPENA: Pendidikan Agama Islam dan Budi Pekerti (Revisi) 6",

            harga: 62000

        }, {

            judul: "English Journey Magelang (Revisi) 3",

            harga: 72000

        }, {

            judul: "English Journey Magelang (Revisi) 6",

            harga: 70000

        }, {

            judul: "Erlangga Fokus AKM",

            harga: 99000

        }, {

            judul: "Erlangga X-PRESS AKM Literasi Membaca",

            harga: 78000

        }, {

            judul: "Erlangga X-PRESS AKM Numerasi",

            harga: 94000

        }, {

            judul: "ESPS Bahasa Indonesia 1",

            harga: 136000

        }, {

            judul: "ESPS Bahasa Indonesia 2",

            harga: 135000

        }, {

            judul: "ESPS Bahasa Indonesia 3",

            harga: 136000

        }, {

            judul: "ESPS Bahasa Indonesia 4",

            harga: 147000

        }, {

            judul: "ESPS Bahasa Indonesia 5",

            harga: 133000

        }, {

            judul: "ESPS Bahasa Indonesia 6",

            harga: 118000

        }, {

            judul: "ESPS Bahasa Indonesia (Revisi) 1",

            harga: 136000

        }, {

            judul: "ESPS Bahasa Indonesia (Revisi) 2",

            harga: 135000

        }, {

            judul: "ESPS Bahasa Indonesia (Revisi) 3",

            harga: 136000

        }, {

            judul: "ESPS Bahasa Indonesia (Revisi) 4",

            harga: 147000

        }, {

            judul: "ESPS Bahasa Indonesia (Revisi) 5",

            harga: 133000

        }, {

            judul: "ESPS Bahasa Indonesia (Revisi) 6",

            harga: 118000

        }, {

            judul: "ESPS IPAS 1",

            harga: 136000

        }, {

            judul: "ESPS IPAS 2",

            harga: 127000

        }, {

            judul: "ESPS IPAS 3",

            harga: 138000

        }, {

            judul: "ESPS IPAS 4 Vol. 1",

            harga: 136000

        }, {

            judul: "ESPS IPAS 4 Vol. 2",

            harga: 136000

        }, {

            judul: "ESPS IPAS 5 Vol. 1",

            harga: 122000

        }, {

            judul: "ESPS IPAS 5 Vol. 2",

            harga: 131000

        }, {

            judul: "ESPS IPAS 6 Vol. 1",

            harga: 101000

        }, {

            judul: "ESPS IPAS 6 Vol. 2",

            harga: 118000

        }, {

            judul: "ESPS IPAS (Revisi) 3",

            harga: 138000

        }, {

            judul: "ESPS IPAS (Revisi) 4 Vol. 1",

            harga: 136000

        }, {

            judul: "ESPS IPAS (Revisi) 4 Vol. 2",

            harga: 136000

        }, {

            judul: "ESPS IPAS (Revisi) 5 Vol. 1",

            harga: 122000

        }, {

            judul: "ESPS IPAS (Revisi) 5 Vol. 2",

            harga: 131000

        }, {

            judul: "ESPS IPAS (Revisi) 6 Vol. 1",

            harga: 101000

        }, {

            judul: "ESPS IPAS (Revisi) 6 Vol. 2",

            harga: 118000

        }, {

            judul: "ESPS Matematika 1",

            harga: 136000

        }, {

            judul: "ESPS Matematika 2",

            harga: 133000

        }, {

            judul: "ESPS Matematika 3",

            harga: 136000

        }, {

            judul: "ESPS Matematika 4",

            harga: 124000

        }, {

            judul: "ESPS Matematika 5",

            harga: 130000

        }, {

            judul: "ESPS Matematika 6",

            harga: 118000

        }, {

            judul: "ESPS Matematika (Revisi) 1",

            harga: 136000

        }, {

            judul: "ESPS Matematika (Revisi) 2",

            harga: 133000

        }, {

            judul: "ESPS Matematika (Revisi) 3",

            harga: 136000

        }, {

            judul: "ESPS Pendidikan Pancasila (Revisi) 1",

            harga: 122000

        }, {

            judul: "ESPS Pendidikan Pancasila (Revisi) 2",

            harga: 128000

        }, {

            judul: "ESPS Pendidikan Pancasila (Revisi) 3",

            harga: 136000

        }, {

            judul: "ESPS Pendidikan Pancasila (Revisi) 4",

            harga: 127000

        }, {

            judul: "ESPS Pendidikan Pancasila (Revisi) 5",

            harga: 128000

        }, {

            judul: "ESPS Pendidikan Pancasila (Revisi) 6",

            harga: 115000

        }, {

            judul: "ESPS Seni Musik (Revisi) 1",

            harga: 99000

        }, {

            judul: "ESPS Seni Musik (Revisi) 4",

            harga: 115000

        }, {

            judul: "ESPS Seni Rupa (Revisi) 1",

            harga: 99000

        }, {

            judul: "ESPS Seni Rupa (Revisi) 2",

            harga: 97000

        }, {

            judul: "ESPS Seni Rupa (Revisi) 3",

            harga: 115000

        }, {

            judul: "ESPS Seni Rupa (Revisi) 4",

            harga: 110000

        }, {

            judul: "ESPS Seni Rupa (Revisi) 5",

            harga: 115000

        }, {

            judul: "ESPS Seni Rupa (Revisi) 6",

            harga: 115000

        }, {

            judul: "GRADED READERS: Granny Fixit and the Pirate Stage 1",

            harga: 45000

        }, {

            judul: "GRADED READERS: Granny Fixit and the Yellow String Stage 1",

            harga: 45000

        }, {

            judul: "GRADED READERS: Katie, Teddy and the Princess Stage 1",

            harga: 45000

        }, {

            judul: "GRADED READERS: Katie, the Pirate and the Treasure Stage 1",

            harga: 45000

        }, {

            judul: "GRADED READERS: PB3 Recycles Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: School Detectives Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Bremen Town Musicians Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Fox and the Grapes Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Giant Rumbledumble Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Gingerbread Man Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Hare and the Tortoise Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Legend of Robin Hood Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Prince and the Poor Boy Stage 1",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Selfish Giant Stage 2",

            harga: 45000

        }, {

            judul: "GRADED READERS: The Wonderful Wizard of Oz Stage 2",

            harga: 45000

        }, {

            judul: "Grow With English 1",

            harga: 105000

        }, {

            judul: "Grow With English 2",

            harga: 107000

        }, {

            judul: "Grow With English 3",

            harga: 107000

        }, {

            judul: "Grow With English 4",

            harga: 139000

        }, {

            judul: "Grow With English 5",

            harga: 114000

        }, {

            judul: "Grow With English 6",

            harga: 104000

        }, {

            judul: "Hooray Jakarta 1",

            harga: 132000

        }, {

            judul: "Hooray Jakarta 2",

            harga: 115000

        }, {

            judul: "Hooray Jakarta 3",

            harga: 128000

        }, {

            judul: "Hooray Jakarta 4",

            harga: 125000

        }, {

            judul: "Hooray Jakarta 5",

            harga: 119000

        }, {

            judul: "Hooray Jakarta 6",

            harga: 119000

        }, {

            judul: "Illustrated Dictionary (English - Bahasa Indonesia)",

            harga: 306000

        }, {

            judul: "Informatika 1",

            harga: 85000

        }, {

            judul: "Informatika 2",

            harga: 84000

        }, {

            judul: "Informatika 3",

            harga: 82000

        }, {

            judul: "Informatika 4",

            harga: 91000

        }, {

            judul: "Informatika 5",

            harga: 81000

        }, {

            judul: "Informatika 6",

            harga: 82000

        }, {

            judul: "Let’s Speak Up (Revisi) 3",

            harga: 105000

        }, {

            judul: "Let’s Speak Up (Revisi) 4",

            harga: 125000

        }, {

            judul: "Lila Cita Mabasa Bali 1",

            harga: 104000

        }, {

            judul: "Lila Cita Mabasa Bali 2",

            harga: 105000

        }, {

            judul: "Lila Cita Mabasa Bali 3",

            harga: 90000

        }, {

            judul: "Lila Cita Mabasa Bali 4",

            harga: 105000

        }, {

            judul: "Lila Cita Mabasa Bali 5",

            harga: 105000

        }, {

            judul: "Lila Cita Mabasa Bali 6",

            harga: 90000

        }, {

            judul: "Ngangsu Kawruh Kabupaten Batang 4",

            harga: 80000

        }, {

            judul: "Ngangsu Kawruh Kabupaten Batang 5",

            harga: 80000

        }, {

            judul: "Ngangsu Kawruh Kabupaten Batang 6",

            harga: 80000

        }, {

            judul: "P5 Magelang - Bhineka Tunggal Ika Fase A",

            harga: 86000

        }, {

            judul: "P5 Magelang - Bhineka Tunggal Ika Fase B",

            harga: 86000

        }, {

            judul: "P5 Magelang - Bhineka Tunggal Ika Fase C",

            harga: 86000

        }, {

            judul: "Paket Soal Digital AKM Literasi Membaca",

            harga: 37000

        }, {

            judul: "Paket Soal Digital AKM Numerasi",

            harga: 37000

        }, {

            judul: "Pangajaran Basa Madura Damar Kambang 3",

            harga: 60000

        }, {

            judul: "Pangajaran Basa Madura Damar Kambang 6",

            harga: 60000

        }, {

            judul: "Pangrumat Basa Sunda 1",

            harga: 95000

        }, {

            judul: "Pangrumat Basa Sunda 2",

            harga: 99000

        }, {

            judul: "Pangrumat Basa Sunda 3",

            harga: 94000

        }, {

            judul: "Pangrumat Basa Sunda 4",

            harga: 99000

        }, {

            judul: "Pangrumat Basa Sunda 5",

            harga: 99000

        }, {

            judul: "Pangrumat Basa Sunda 6",

            harga: 83000

        }, {

            judul: "Pencak Silat 1",

            harga: 85000

        }, {

            judul: "Pencak Silat 2",

            harga: 85000

        }, {

            judul: "Pencak Silat 4",

            harga: 85000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti 1",

            harga: 90000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti 2",

            harga: 91000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti 3",

            harga: 106000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti 4",

            harga: 99000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti 5",

            harga: 83000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti 6",

            harga: 87000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti (Revisi) 1",

            harga: 90000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti (Revisi) 2",

            harga: 91000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti (Revisi) 3",

            harga: 106000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti (Revisi) 4",

            harga: 99000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti (Revisi) 5",

            harga: 83000

        }, {

            judul: "Pendidikan Agama Islam dan Budi Pekerti (Revisi) 6",

            harga: 87000

        }, {

            judul: "Pendidikan Budaya & Lingkungan Kab. Batang 1",

            harga: 79000

        }, {

            judul: "Pendidikan Budaya & Lingkungan Kab. Batang 2",

            harga: 92000

        }, {

            judul: "Pendidikan Budaya & Lingkungan Kab. Batang 3",

            harga: 92000

        }, {

            judul: "Pendidikan Lingkungan dan Budaya Jakarta 1",

            harga: 86000

        }, {

            judul: "Pendidikan Lingkungan dan Budaya Jakarta 2",

            harga: 91000

        }, {

            judul: "Pendidikan Lingkungan dan Budaya Jakarta 3",

            harga: 99000

        }, {

            judul: "Pendidikan Lingkungan dan Budaya Jakarta 4",

            harga: 99000

        }, {

            judul: "Pendidikan Lingkungan dan Budaya Jakarta 5",

            harga: 91000

        }, {

            judul: "Pendidikan Lingkungan dan Budaya Jakarta 6",

            harga: 99000

        }, {

            judul: "Pendidikan Lingkungan Hidup 1",

            harga: 70000

        }, {

            judul: "Pendidikan Lingkungan Hidup 2",

            harga: 70000

        }, {

            judul: "Pendidikan Lingkungan Hidup 3",

            harga: 70000

        }, {

            judul: "Pendidikan Lingkungan Hidup 4",

            harga: 70000

        }, {

            judul: "Pendidikan Lingkungan Hidup 5",

            harga: 70000

        }, {

            judul: "Pendidikan Lingkungan Hidup 6",

            harga: 70000

        }, {

            judul: "Pendidikan Muatan Lokal Muba 2",

            harga: 80000

        }, {

            judul: "Pendidikan Muatan Lokal Muba 3",

            harga: 80000

        }, {

            judul: "Pendidikan Muatan Lokal Muba 4",

            harga: 80000

        }, {

            judul: "Pendidikan Muatan Lokal Muba 5",

            harga: 80000

        }, {

            judul: "Pendidikan Muatan Lokal Muba 6",

            harga: 80000

        }, {

            judul: "Pinter Basa 1",

            harga: 99000

        }, {

            judul: "Pinter Basa 2",

            harga: 86000

        }, {

            judul: "Pinter Basa 3",

            harga: 86000

        }, {

            judul: "Pinter Basa 4",

            harga: 99000

        }, {

            judul: "Pinter Basa 5",

            harga: 86000

        }, {

            judul: "Pinter Basa 6",

            harga: 86000

        }, {

            judul: "PJOK 1",

            harga: 77000

        }, {

            judul: "PJOK 2",

            harga: 76000

        }, {

            judul: "PJOK 3",

            harga: 68000

        }, {

            judul: "PJOK 4",

            harga: 77000

        }, {

            judul: "PJOK 5",

            harga: 76000

        }, {

            judul: "PJOK 6",

            harga: 72000

        }, {

            judul: "PJOK (Revisi) 1",

            harga: 68000

        }, {

            judul: "PJOK (Revisi) 2",

            harga: 76000

        }, {

            judul: "PJOK (Revisi) 3",

            harga: 68000

        }, {

            judul: "PJOK (Revisi) 4",

            harga: 77000

        }, {

            judul: "PJOK (Revisi) 5",

            harga: 76000

        }, {

            judul: "PJOK (Revisi) 6",

            harga: 72000

        }, {

            judul: "Remen Basa Jawi 1",

            harga: 101000

        }, {

            judul: "Remen Basa Jawi 2",

            harga: 104000

        }, {

            judul: "Remen Basa Jawi 3",

            harga: 91000

        }, {

            judul: "Remen Basa Jawi 4",

            harga: 101000

        }, {

            judul: "Remen Basa Jawi 5",

            harga: 101000

        }, {

            judul: "Remen Basa Jawi 6",

            harga: 91000

        }, {

            judul: "Seni Budaya (Revisi) 1",

            harga: 78000

        }, {

            judul: "Seni Budaya (Revisi) 2",

            harga: 74000

        }, {

            judul: "Seni Budaya (Revisi) 3",

            harga: 70000

        }, {

            judul: "Seni Budaya (Revisi) 4",

            harga: 78000

        }, {

            judul: "Seni Budaya (Revisi) 5",

            harga: 81000

        }, {

            judul: "Seni Budaya (Revisi) 6",

            harga: 70000

        }, {

            judul: "Siap P5 Barito Kuala - Gaya Hidup Berkelanjutan 5",

            harga: 55000

        }, {

            judul: "Siap P5 Barito Kuala - Kearifan Lokal 3",

            harga: 50000

        }, {

            judul: "Siap P5 Barito Kuala - Kearifan Lokal 4",

            harga: 55000

        }, {

            judul: "Siap P5 Barito Kuala - Kearifan Lokal 6",

            harga: 55000

        }, {

            judul: "Siap P5 Kabupaten Banjar - Kearifan Lokal 3",

            harga: 55000

        }, {

            judul: "Siap P5 Kabupaten Banjar - Kearifan Lokal 4",

            harga: 55000

        }, {

            judul: "Siap P5 Kota Banjarmasin - Gaya Hidup Berkelanjutan 6",

            harga: 80000

        }, {

            judul: "Siap P5 Kota Banjarmasin - Kearifan Lokal 4",

            harga: 80000

        }, {

            judul: "Siap P5 Kota Banjarmasin - Kearifan Lokal 5",

            harga: 80000

        }, {

            judul: "SIMASTER 1A",

            harga: 78000

        }, {

            judul: "SIMASTER 1B",

            harga: 72000

        }, {

            judul: "SIMASTER 2A",

            harga: 70000

        }, {

            judul: "SIMASTER 2B",

            harga: 72000

        }, {

            judul: "SIMASTER 3A",

            harga: 108000

        }, {

            judul: "SIMASTER 3B",

            harga: 94000

        }, {

            judul: "SIMASTER 4A",

            harga: 104000

        }, {

            judul: "SIMASTER 4B",

            harga: 104000

        }, {

            judul: "SIMASTER 5A",

            harga: 104000

        }, {

            judul: "SIMASTER 5B",

            harga: 104000

        }, {

            judul: "SIMASTER 6A",

            harga: 107000

        }, {

            judul: "SIMASTER 6B",

            harga: 94000

        }, {

            judul: "Sinau Basa Jawa Yogya 1",

            harga: 105000

        }, {

            judul: "Sinau Basa Jawa Yogya 2",

            harga: 105000

        }, {

            judul: "Sinau Basa Jawa Yogya 3",

            harga: 91000

        }, {

            judul: "Sinau Basa Jawa Yogya 4",

            harga: 105000

        }, {

            judul: "Sinau Basa Jawa Yogya 5",

            harga: 87000

        }, {

            judul: "Sinau Basa Jawa Yogya 6",

            harga: 91000

        }, {

            judul: "Sinau Basa Jawa Yogya 2025",

            harga: 95000

        }, {

            judul: "Titis Basa Jawa Kabupaten Madiun 1",

            harga: 80000

        }, {

            judul: "Titis Basa Jawa Kabupaten Madiun 2",

            harga: 80000

        }, {

            judul: "Titis Basa Jawa Kabupaten Madiun 3",

            harga: 80000

        }, {

            judul: "Titis Basa Jawa Kabupaten Madiun 4",

            harga: 80000

        }, {

            judul: "Titis Basa Jawa Kabupaten Madiun 5",

            harga: 80000

        }, {

            judul: "Titis Basa Jawa Kabupaten Madiun 6",

            harga: 80000

        }, {

            judul: "Wasis Basa 1",

            harga: 104000

        }, {

            judul: "Wasis Basa 2",

            harga: 104000

        }, {

            judul: "Wasis Basa 3",

            harga: 90000

        }, {

            judul: "Wasis Basa 4",

            harga: 104000

        }, {

            judul: "Wasis Basa 5",

            harga: 104000

        }, {

            judul: "Wasis Basa 6",

            harga: 91000

        }, {

            judul: "Wonderful Facts of Indonesia: Geografi",

            harga: 153000

        }, {

            judul: "Wonderful Facts of Indonesia: Kekayaan Alam",

            harga: 150000

        }, ]

    }]

},
        {
            category: "Erlangga - Koding dan KA SD",
            subsections: [
                {
                    title: "Buku Siswa",
                    books: [
                        { judul: "Explore Koding dan Kecerdasan Artifisial SD/MI Kelas 5", harga: 48600 },
                        { judul: "Mengenal Koding dan Kecerdasan Artifisial SD/MI Kelas 6", harga: 93000 }
                    ]
                }
            ]
        },
       
       
      
       
        {
            category: "Yudhistira - Buku Teks Utama SD",
            subsections: [
                {
                    title: "Buku Siswa",
                    books: [
                        { judul: "Pendidikan Agama Islam & Budi Pekerti untuk SD Kls 1", harga: 95000 },
                        { judul: "Pendidikan Agama Islam & Budi Pekerti untuk SD Kls 2", harga: 125000 },
                        { judul: "Pendidikan Agama Islam & Budi Pekerti untuk SD Kls 3", harga: 115000 },
                        { judul: "Pendidikan Agama Islam & Budi Pekerti untuk SD Kls 4", harga: 110000 },
                        { judul: "Pendidikan Agama Islam & Budi Pekerti untuk SD Kls 5", harga: 120000 },
                        { judul: "Pendidikan Agama Islam & Budi Pekerti untuk SD Kls 6", harga: 110000 },
                        { judul: "Bahasa Indonesia Untuk SD/MI Kls 1", harga: 105000 },
                        { judul: "Bahasa Indonesia Untuk SD/MI Kls 2", harga: 135000 },
                        { judul: "Bahasa Indonesia Untuk SD/MI Kls 3", harga: 135000 },
                        { judul: "Bahasa Indonesia Untuk SD/MI Kls 4", harga: 110000 },
                        { judul: "Bahasa Indonesia Untuk SD/MI Kls 5", harga: 135000 },
                        { judul: "Bahasa Indonesia Untuk SD/MI Kls 6", harga: 135000 },
                        { judul: "Matematika untuk SD/MI Kls 1", harga: 110000 },
                        { judul: "Matematika untuk SD/MI Kls 2", harga: 135000 },
                        { judul: "Matematika untuk SD/MI Kls 3", harga: 135000 },
                        { judul: "Matematika untuk SD/MI Kls 4", harga: 135000 },
                        { judul: "Matematika untuk SD/MI Kls 5", harga: 150000 },
                        { judul: "Matematika untuk SD/MI Kls 6", harga: 115000 },
                        { judul: "Ilmu Pengetahuna Alam & Sosial untuk SD/MI Kls 1", harga: 105000 },
                        { judul: "Ilmu Pengetahuna Alam & Sosial untuk SD/MI Kls 2", harga: 100000 },
                        { judul: "Ilmu Pengetahuna Alam & Sosial untuk SD/MI Kls 3", harga: 130000 },
                        { judul: "Ilmu Pengetahuna Alam & Sosial untuk SD/MI Kls 4", harga: 150000 },
                        { judul: "Ilmu Pengetahuna Alam & Sosial untuk SD/MI Kls 5", harga: 170000 },
                        { judul: "Ilmu Pengetahuna Alam & Sosial untuk SD/MI Kls 6", harga: 135000 },
                        { judul: "Pendidikan Pancasila & Kewarganegaraan SD/MI Kls 1", harga: 90000 },
                        { judul: "Pendidikan Pancasila & Kewarganegaraan SD/MI Kls 2", harga: 90000 },
                        { judul: "Pendidikan Pancasila & Kewarganegaraan SD/MI Kls 3", harga: 90000 },
                        { judul: "Pendidikan Pancasila & Kewarganegaraan SD/MI Kls 4", harga: 95000 },
                        { judul: "Pendidikan Pancasila & Kewarganegaraan SD/MI Kls 5", harga: 88000 },
                        { judul: "Pendidikan Pancasila & Kewarganegaraan SD/MI Kls 6", harga: 90000 },
                        { judul: "Proyek Penguatan Profil Pelajar Pancasila kls 1 SD", harga: 80000 },
                        { judul: "Proyek Penguatan Profil Pelajar Pancasila kls 2 SD", harga: 90000 },
                        { judul: "Proyek Penguatan Profil Pelajar Pancasila kls 3 SD", harga: 85000 },
                        { judul: "Proyek Penguatan Profil Pelajar Pancasila kls 4 SD", harga: 80000 },
                        { judul: "Proyek Penguatan Profil Pelajar Pancasila kls 5 SD", harga: 85000 },
                        { judul: "Proyek Penguatan Profil Pelajar Pancasila kls 6 SD", harga: 80000 },
                        { judul: "Informatika untuk SD/MI Kls 1", harga: 75000 },
                        { judul: "Informatika untuk SD/MI Kls 2", harga: 78000 },
                        { judul: "Informatika untuk SD/MI Kls 3", harga: 88000 },
                        { judul: "Informatika untuk SD/MI Kls 4", harga: 85000 },
                        { judul: "Informatika untuk SD/MI Kls 5", harga: 94000 },
                        { judul: "Informatika untuk SD/MI Kls 6", harga: 85000 },
                        { judul: "Pendidikan Seni Tari Untuk SD Kls 1", harga: 68000 },
                        { judul: "Pendidikan Seni Tari Untuk SD Kls 2", harga: 68000 },
                        { judul: "Pendidikan Seni Tari Untuk SD Kls 3", harga: 70000 },
                        { judul: "Pendidikan Seni Tari Untuk SD Kls 4", harga: 70000 },
                        { judul: "Pendidikan Seni Tari Untuk SD Kls 5", harga: 65000 },
                        { judul: "Pendidikan Seni Tari Untuk SD Kls 6", harga: 70000 },
                        { judul: "Pendidikan Seni Musik Untuk SD Kls 1", harga: 65000 },
                        { judul: "Pendidikan Seni Musik Untuk SD Kls 2", harga: 65000 },
                        { judul: "Pendidikan Seni Musik Untuk SD Kls 3", harga: 70000 },
                        { judul: "Pendidikan Seni Musik Untuk SD Kls 4", harga: 68000 },
                        { judul: "Pendidikan Seni Musik Untuk SD Kls 5", harga: 70000 },
                        { judul: "Pendidikan Seni Musik Untuk SD Kls 6", harga: 70000 },
                        { judul: "Pendidikan Seni Rupa Untuk SD Kls 1", harga: 70000 },
                        { judul: "Pendidikan Seni Rupa Untuk SD Kls 2", harga: 70000 },
                        { judul: "Pendidikan Seni Rupa Untuk SD Kls 3", harga: 70000 },
                        { judul: "Pendidikan Seni Rupa Untuk SD Kls 4", harga: 78000 },
                        { judul: "Pendidikan Seni Rupa Untuk SD Kls 5", harga: 70000 },
                        { judul: "Pendidikan Seni Rupa Untuk SD Kls 6", harga: 75000 },
                        { judul: "Pendidikan Seni Teater Untuk SD Kls 1", harga: 65000 },
                        { judul: "Pendidikan Seni Teater Untuk SD Kls 2", harga: 70000 },
                        { judul: "Pendidikan Seni Teater Untuk SD Kls 3", harga: 70000 },
                        { judul: "Pendidikan Seni Teater Untuk SD Kls 4", harga: 65000 },
                        { judul: "Pendidikan Seni Teater Untuk SD Kls 5", harga: 72000 },
                        { judul: "Pendidikan Seni Teater Untuk SD Kls 6", harga: 75000 },
                        { judul: "Baca Tulis Al-Quran untuk SD/MI Kls 1 Depag ( SK )", harga: 64000 },
                        { judul: "Baca Tulis Al-Quran untuk SD/MI Kls 2 Depag ( SK )", harga: 60000 },
                        { judul: "Baca Tulis Al-Quran untuk SD/MI Kls 3 Depag ( SK )", harga: 64000 },
                        { judul: "Baca Tulis Al-Quran untuk SD/MI Kls 4 Depag ( SK )", harga: 60000 },
                        { judul: "Baca Tulis Al-Quran untuk SD/MI Kls 5 Depag ( SK )", harga: 60000 },
                        { judul: "Baca Tulis Al-Quran untuk SD/MI Kls 6 Depag ( SK )", harga: 64000 },
                        { judul: "Bahasa Jawa Timur untuk SD/MI Kls 1 (Kur. Merdeka)", harga: 68000 },
                        { judul: "Bahasa Jawa Timur untuk SD/MI Kls 2 (Kur. Merdeka)", harga: 68000 },
                        { judul: "Bahasa Jawa Timur untuk SD/MI Kls 3 (Kur. Merdeka)", harga: 74000 },
                        { judul: "Bahasa Jawa Timur untuk SD/MI Kls 4 (Kur. Merdeka)", harga: 74000 },
                        { judul: "Bahasa Jawa Timur untuk SD/MI Kls 5 (Kur. Merdeka)", harga: 74000 },
                        { judul: "Bahasa Jawa Timur untuk SD/MI Kls 6 (Kur. Merdeka)", harga: 74000 }
                    ]
                }
            ]
        },
        {
            category: "Yudhistira - Buku Teks Pendamping SD",
            subsections: [
                {
                    title: "Buku Siswa",
                    books: [
                        { judul: "SPLASH: Bahasa Indonesia Untuk SD/MI Kls 1", harga: 66000 },
                        { judul: "SPLASH: Bahasa Indonesia Untuk SD/MI Kls 2", harga: 66000 },
                        { judul: "SPLASH: Bahasa Indonesia Untuk SD/MI Kls 3", harga: 65000 },
                        { judul: "SPLASH: Bahasa Indonesia Untuk SD/MI Kls 4", harga: 66000 },
                        { judul: "SPLASH: Bahasa Indonesia Untuk SD/MI Kls 5", harga: 70000 },
                        { judul: "SPLASH: Bahasa Indonesia Untuk SD/MI Kls 6", harga: 68000 },
                        { judul: "SPLASH: Matematika untuk SD/MI Kls 1", harga: 65000 },
                        { judul: "SPLASH: Matematika untuk SD/MI Kls 2", harga: 65000 },
                        { judul: "SPLASH: Matematika untuk SD/MI Kls 3", harga: 64000 },
                        { judul: "SPLASH: Matematika untuk SD/MI Kls 4", harga: 65000 },
                        { judul: "SPLASH: Matematika untuk SD/MI Kls 5", harga: 66000 },
                        { judul: "SPLASH: Matematika untuk SD/MI Kls 6", harga: 64000 },
                        { judul: "SPLASH: IPAS untuk SD/MI Kls 3", harga: 68000 },
                        { judul: "SPLASH: IPAS untuk SD/MI Kls 4", harga: 66000 },
                        { judul: "SPLASH: IPAS untuk SD/MI Kls 5", harga: 70000 },
                        { judul: "SPLASH: IPAS untuk SD/MI Kls 6", harga: 68000 },
                        { judul: "SPLASH: Pendidikan Pancasila & Kewarganegaraan untuk SD/MI Kls 1", harga: 68000 },
                        { judul: "SPLASH: Pendidikan Pancasila & Kewarganegaraan untuk SD/MI Kls 2", harga: 66000 },
                        { judul: "SPLASH: Pendidikan Pancasila & Kewarganegaraan untuk SD/MI Kls 3", harga: 65000 },
                        { judul: "SPLASH: Pendidikan Pancasila & Kewarganegaraan untuk SD/MI Kls 4", harga: 70000 },
                        { judul: "SPLASH: Pendidikan Pancasila & Kewarganegaraan untuk SD/MI Kls 5", harga: 68000 },
                        { judul: "SPLASH: Pendidikan Pancasila & Kewarganegaraan untuk SD/MI Kls 6", harga: 68000 }
                    ]
                }
            ]
        },
       
    ];

// ------------------------------------

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// util highlight pencarian
const highlightMatch = (text, q) => {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return (<span>{before}<mark style={{ padding: 0, background: '#fffb8f' }}>{match}</mark>{after}</span>);
};

// Tabel Buku + "Lihat Semua" + filter by searchTerm
const BookTable = ({ subsection, handleQuantityChange, formQuantities, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredBooks = useMemo(() => {
    const all = subsection.books || [];
    if (!searchTerm) return all;
    return all.filter(b => b.judul.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [subsection.books, searchTerm]);

  const hasMore = filteredBooks.length > 10;
  const dataSource = isExpanded ? filteredBooks : filteredBooks.slice(0, 10);

  const tableContainerStyle = {
    position: 'relative',
    maxHeight: hasMore && !isExpanded ? '580px' : 'none',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-in-out',
  };

  const seeMoreShadowStyle = {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
    pointerEvents: 'none',
    display: hasMore && !isExpanded ? 'block' : 'none',
  };

  const columns = [
    { title: 'No', render: (_, record) => (filteredBooks.indexOf(record) + 1), width: 60, align: 'center' },
    { title: 'Judul Buku', dataIndex: 'judul', key: 'judul', render: (v) => highlightMatch(v, searchTerm) },
    { title: 'Harga', dataIndex: 'harga', key: 'harga', width: 140, align: 'right',
      render: (harga) => `Rp ${harga.toLocaleString('id-ID')}` },
    {
      title: 'Qty', key: 'qty', width: 120, align: 'center',
      render: (record) => (
        <InputNumber
          min={0}
          value={formQuantities[record.judul] || 0}
          onChange={(value) => handleQuantityChange(record.judul, value)}
          style={{ width: 80 }}
        />
      )
    },
    {
      title: 'Subtotal', key: 'total', width: 160, align: 'right',
      render: (record) => `Rp ${(record.harga * (formQuantities[record.judul] || 0)).toLocaleString('id-ID')}`
    },
  ];

  return (
    <div key={subsection.title}>
      <Space align="center" size="small" style={{ marginBottom: 8 }}>
        <Title level={5} style={{ margin: 0 }}>{subsection.title}</Title>
        <Tag color="green">Pilih Qty</Tag>
      </Space>

      {filteredBooks.length === 0 ? (
        <Empty description="Tidak ada buku yang cocok dengan pencarian." />
      ) : (
        <>
          <div style={tableContainerStyle}>
            <Table
              columns={columns}
              dataSource={dataSource.map(b => ({ ...b, key: b.judul }))}
              pagination={false}
              bordered
              size="small"
            />
            <div style={seeMoreShadowStyle}></div>
          </div>

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Button type="default" onClick={() => setIsExpanded(prev => !prev)}>
                {isExpanded ? 'Tampilkan Lebih Sedikit' : `Lihat Semua (${filteredBooks.length} item)`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const App = () => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingKabupaten, setLoadingKabupaten] = useState(false);

  const [formQuantities, setFormQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({ visible: false, type: 'success', message: '' });
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // NEW: modal konfirmasi
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Gagal memuat provinsi:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };
    loadProvinces();
  }, []);

  const handleProvinceChange = async (provinceId) => {
    form.setFieldsValue({ kabupaten: null });
    setKabupatenList([]);
    if (!provinceId) return;

    setLoadingKabupaten(true);
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      const data = await response.json();
      setKabupatenList(data);
    } catch (error) {
      console.error("Gagal memuat kabupaten:", error);
    } finally {
      setLoadingKabupaten(false);
    }
  };

  const handleQuantityChange = (bookJudul, value) => {
    setFormQuantities(prev => ({ ...prev, [bookJudul]: value }));
  };

  const { grandTotal, summaryItems, totalQty } = useMemo(() => {
    let total = 0;
    let qtySum = 0;
    const items = [];
    bookData.forEach(cat =>
      cat.subsections.forEach(sub =>
        sub.books.forEach(book => {
          const qty = Number(formQuantities[book.judul] || 0);
          if (qty > 0) {
            const itemTotal = book.harga * qty;
            total += itemTotal;
            qtySum += qty;
            items.push({ ...book, qty, total: itemTotal, key: book.judul });
          }
        })
      )
    );
    return { grandTotal: total, summaryItems: items, totalQty: qtySum };
  }, [formQuantities]);

  const onFinish = async (values) => {
    setIsLoading(true);
    setResult({ visible: false });

    const schoolData = {
      ...values,
      provinsi: provinces.find(p => p.id === values.provinsi)?.name,
      kabupaten: kabupatenList.find(k => k.id === values.kabupaten)?.name,
    };

    if (summaryItems.length === 0) {
      setResult({ visible: true, type: 'error', message: 'Pemesanan Gagal! Mohon isi kuantitas minimal pada satu barang.' });
      setIsLoading(false);
      return;
    }

    const payload = { schoolData, itemsData: summaryItems };
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxExwwoLp-VB_YsMda39NwYYtRzQ0zuAXSTWGnB60xdEw572p64zXriBvrX9J2ryHS3IA/exec";

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const data = await response.json();
      if (!data.ok) throw new Error(data.error || 'Terjadi kesalahan dari server.');

      if (data.spreadsheetUrl) {
        window.open(data.spreadsheetUrl, '_blank', 'noopener,noreferrer');
      }

      setResult({
        visible: true,
        type: 'success',
        message: (
          <span>
            ✅ Sukses! Data telah disimpan.{' '}
            <a href={data.spreadsheetUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, textDecoration: 'underline' }}>
              Buka Google Sheet
            </a>. <mark>Periksa kembali: judul, kuantitas, dan total.</mark>
          </span>
        )
      });

      form.resetFields();
      setFormQuantities({});
    } catch (error) {
      setResult({ visible: true, type: 'error', message: `Terjadi Error: ${error.message}. Pastikan URL Google Script sudah benar.` });
    } finally {
      setIsLoading(false);
    }
  };

  const detailColumns = [
    { title: 'Judul', dataIndex: 'judul', key: 'judul', ellipsis: true },
    { title: 'Qty', dataIndex: 'qty', key: 'qty', width: 80, align: 'center' },
    { title: 'Harga', dataIndex: 'harga', key: 'harga', width: 120, align: 'right', render: v => `Rp ${v.toLocaleString('id-ID')}` },
    { title: 'Subtotal', dataIndex: 'total', key: 'total', width: 140, align: 'right', render: v => `Rp ${v.toLocaleString('id-ID')}` },
  ];

  // THEME hijau + ukuran tombol besar untuk aksi utama
  const theme = {
    token: {
      colorPrimary: '#16a34a',
      colorInfo: '#16a34a',
      borderRadius: 10,
      controlHeight: 44
    },
    components: {
      Button: { fontWeight: 600 }
    }
  };

  const onSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh', background: '#f7faf7' }}>
        <Header style={{ background: '#fff', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <Title level={3} style={{ margin: '14px 0' }}>Formulir Pemesanan Buku</Title>
          <Text type="secondary">Isi identitas sekolah → pilih buku → kirim pesanan.</Text>
        </Header>

        <Content style={{ padding: '24px' }}>
          <Card style={{ maxWidth: 980, margin: 'auto', marginBottom: 190 }} bodyStyle={{ padding: 24 }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Title level={4} style={{ marginBottom: 12 }}>Informasi Sekolah</Title>
              <Row gutter={[16, 8]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Provinsi"
                    name="provinsi"
                    rules={[{ required: true, message: 'Provinsi harus diisi!' }]}
                  >
                    <Select
                      placeholder="Pilih Provinsi"
                      onChange={handleProvinceChange}
                      loading={loadingProvinces}
                      showSearch
                      optionFilterProp="children"
                    >
                      {provinces.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Kabupaten/Kota"
                    name="kabupaten"
                    rules={[{ required: true, message: 'Kabupaten/Kota harus diisi!' }]}
                  >
                    <Select
                      placeholder="Pilih Kabupaten/Kota"
                      loading={loadingKabupaten}
                      disabled={kabupatenList.length === 0}
                      showSearch
                      optionFilterProp="children"
                    >
                      {kabupatenList.map(k => <Option key={k.id} value={k.id}>{k.name}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Nama Sekolah" name="sekolah" rules={[{ required: true, message: 'Nama Sekolah harus diisi!' }]}>
                    <Input placeholder="Contoh: SDN 01 Sukamaju" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Nama Kepala Sekolah" name="kepalaSekolah" rules={[{ required: true, message: 'Nama Kepala Sekolah harus diisi!' }]}>
                    <Input placeholder="Nama lengkap" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Nomor HP"
                    name="nomorHp"
                    rules={[
                      { required: true, message: 'Nomor HP harus diisi!' },
                      { pattern: /^\d+$/, message: 'Nomor HP hanya boleh berisi angka!' }
                    ]}
                  >
                    <Input placeholder="08xxxxxxxxxx" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Alamat Lengkap Sekolah" name="alamat" rules={[{ required: true, message: 'Alamat harus diisi!' }]}>
                    <Input.TextArea rows={3} placeholder="Jalan, RT/RW, Kelurahan, Kode Pos" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Daftar Buku</Title>
                </Col>
                <Col xs={24} md="auto" style={{ marginTop: 8 }}>
                  <Input
                    allowClear
                    prefix={<SearchOutlined />}
                    placeholder="Cari buku… cth. Matematika"
                    value={searchTerm}
                    onChange={onSearchChange}
                    style={{ width: 320, maxWidth: '100%' }}
                  />
                </Col>
              </Row>

              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {bookData.map(section => (
                  <Card
                    key={section.category}
                    title={<Space><span>{section.category}</span><Tag color="green">Tersedia</Tag></Space>}
                    type="inner"
                  >
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      {section.subsections.map(subsection =>
                        <BookTable
                          key={subsection.title}
                          subsection={subsection}
                          handleQuantityChange={handleQuantityChange}
                          formQuantities={formQuantities}
                          searchTerm={searchTerm}
                        />
                      )}
                    </Space>
                  </Card>
                ))}
              </Space>
            </Form>
          </Card>
        </Content>

        {/* FOOTER ringkas + tombol jelas terlihat */}
<Footer
  style={{
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#fff',
    boxShadow: '0 -3px 12px rgba(0,0,0,0.08)',
    padding: '20px 32px',
    zIndex: 10
  }}
>
  {result.visible && (
    <Alert
      message={result.message}
      type={result.type}
      showIcon
      closable
      onClose={() => setResult({ visible: false })}
      style={{ marginBottom: 16 }}
    />
  )}

  <div style={{ maxWidth: 960, margin: '0 auto' }}>
    <Row gutter={[24, 16]} align="middle" wrap>
      <Col xs={24} md={12}>
        <Card size="small" bordered bodyStyle={{ padding: 12 }} style={{ borderRadius: 10 }}>
          <Space direction="vertical" size={6} style={{ width: '100%' }}>
            <Text type="secondary">
              {summaryItems.length} judul dipilih{totalQty > 0 ? ` • ${totalQty} buku` : ''}
            </Text>
            <Title level={4} style={{ margin: 0 }}>
              Total: Rp {grandTotal.toLocaleString('id-ID')}
            </Title>
            <Button
              icon={<EyeOutlined />}
              size="large"
              style={{ height: 48, fontWeight: 600, alignSelf: 'flex-start' }}
              disabled={summaryItems.length === 0}
              onClick={() => setDetailOpen(true)}
              aria-label="Lihat detail pesanan"
            >
              Lihat Detail
            </Button>
          </Space>
        </Card>
      </Col>

      <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          size="large"
          style={{ minWidth: 340, height: 60, fontSize: 18, fontWeight: 700, borderRadius: 10 }}
          onClick={async () => {
            if (summaryItems.length === 0) {
              setResult({ visible: true, type: 'error', message: 'Pilih minimal 1 buku dulu.' });
              return;
            }
            try {
              await form.validateFields();        // <- VALIDASI FORM
              setConfirmOpen(true);               // valid -> buka modal konfirmasi
            } catch (err) {
              setResult({
                visible: true,
                type: 'error',
                message: 'Lengkapi identitas sekolah terlebih dahulu.'
              });
              if (err?.errorFields?.[0]?.name) {
                form.scrollToField(err.errorFields[0].name, { behavior: 'smooth', block: 'center' });
              }
            }
          }}
          loading={isLoading}
          aria-label="Kirim pesanan ke Google Sheet"
          block={window.innerWidth < 576}
        >
          {isLoading ? 'Mengirim…' : 'Kirim Pesanan ke Google Sheet'}
        </Button>
      </Col>
    </Row>
  </div>
</Footer>


        {/* Modal Loading */}
        <Modal open={isLoading} footer={null} closable={false} centered>
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <Spin size="large" />
            <p style={{ marginTop: '15px' }}>Memproses permintaan Anda...</p>
          </div>
        </Modal>

        {/* Modal Detail Pesanan */}
        <Modal
          title="Detail Pesanan"
          open={detailOpen}
          onCancel={() => setDetailOpen(false)}
          footer={[<Button key="close" onClick={() => setDetailOpen(false)}>Tutup</Button>]}
          width={800}
        >
          {summaryItems.length === 0 ? (
            <Alert type="info" message="Belum ada item dipilih." />
          ) : (
            <>
              <Table size="small" columns={detailColumns} dataSource={summaryItems} pagination={{ pageSize: 8 }} />
              <Divider style={{ margin: '12px 0' }} />
              <Space direction="horizontal" style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Text strong>{totalQty} buku</Text>
                <Text strong>Total: Rp {grandTotal.toLocaleString('id-ID')}</Text>
              </Space>
            </>
          )}
        </Modal>

        {/* Modal Konfirmasi sebelum submit */}
        <Modal
          title="Konfirmasi Pesanan"
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          footer={null}
          width={840}
          destroyOnClose
        >
          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: 12 }}
            message={
              <span>
                <strong>Catatan:</strong> Pastikan <strong>jumlah</strong> dan <strong>judul</strong> buku sudah sesuai dengan keinginan Anda.
              </span>
            }
          />

          {summaryItems.length === 0 ? (
            <Empty description="Belum ada item dipilih." />
          ) : (
            <>
              <Table
                size="small"
                columns={[
                  { title: 'Judul', dataIndex: 'judul', key: 'judul', ellipsis: true },
                  { title: 'Qty', dataIndex: 'qty', key: 'qty', width: 80, align: 'center' },
                  { title: 'Harga', dataIndex: 'harga', key: 'harga', width: 120, align: 'right', render: v => `Rp ${v.toLocaleString('id-ID')}` },
                  { title: 'Subtotal', dataIndex: 'total', key: 'total', width: 140, align: 'right', render: v => `Rp ${v.toLocaleString('id-ID')}` },
                ]}
                dataSource={summaryItems}
                pagination={{ pageSize: 8 }}
              />

              <Divider style={{ margin: '12px 0' }} />

              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <Text strong>{totalQty} buku</Text>
                    <Text type="secondary">•</Text>
                    <Text strong>Total: Rp {grandTotal.toLocaleString('id-ID')}</Text>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Button onClick={() => setConfirmOpen(false)}>Batal</Button>
                    <Button
                      type="primary"
                      size="large"
                      loading={isLoading}
                      onClick={() => {
                        setConfirmOpen(false);
                        form.submit(); // lanjut ke onFinish
                      }}
                    >
                      Kirim Pesanan
                    </Button>
                  </Space>
                </Col>
              </Row>
            </>
          )}
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

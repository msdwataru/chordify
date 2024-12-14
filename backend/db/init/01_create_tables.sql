-- データベースへの接続を切り替え
\c chordify;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL
);

-- サンプルデータの挿入
INSERT INTO songs (title, artist) VALUES
    ('Imagine', 'John Lennon'),
    ('上を向いて歩こう', '坂本九'),
    ('TSUNAMI', 'Southern All Stars'),
    ('残酷な天使のテーゼ', '高橋洋子'),
    ('紅', 'X JAPAN'),
    ('チェリー', 'スピッツ'),
    ('天城越え', '石川さゆり'),
    ('HANABI', 'Mr.Children'),
    ('前前前世', 'RADWIMPS'),
    ('Pretender', 'Official髭男dism');
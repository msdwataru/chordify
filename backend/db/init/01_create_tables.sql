-- データベースへの接続を切り替え
\c chordify;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL
);

-- 小節（measures）テーブルの作成
CREATE TABLE IF NOT EXISTS measures (
    id SERIAL PRIMARY KEY,
    song_id INTEGER NOT NULL,
    measure_number INTEGER NOT NULL,  -- 小節番号（順序）
    lyrics TEXT,                      -- その小節の歌詞
    chords TEXT,                      -- その小節のコード進行
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE,
    UNIQUE (song_id, measure_number)  -- 同じ曲の中で小節番号は重複しない
);

-- オプション：セクション（verse, chorus等）を管理するテーブル
CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    song_id INTEGER NOT NULL,
    section_name VARCHAR(50) NOT NULL,  -- 例: イントロ、Aメロ、サビ など
    start_measure INTEGER NOT NULL,     -- セクション開始小節
    end_measure INTEGER NOT NULL,       -- セクション終了小節
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
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

-- measuresテーブルのサンプルデータ（"上を向いて歩こう"の例）
INSERT INTO measures (song_id, measure_number, lyrics, chords) VALUES
    (2, 1, '上を向いて', 'C Em'),
    (2, 2, '歩こう', 'F G'),
    (2, 3, '涙がこぼれ', 'C Am'),
    (2, 4, 'ないように', 'F G C'),
    (2, 5, '思い出す', 'C Em'),
    (2, 6, 'はるかな', 'F G'),
    (2, 7, '眩しい', 'C Am'),
    (2, 8, '諸君を', 'F G C');
    (2, 9, '幸せは', 'F G'),
    (2, 10, '雲の上に', 'C Am'),
    (2, 11, '幸せは', 'F G'),
    (2, 12, '空の上に', 'C C7'),
    (2, 13, '上を向いて', 'F G'),
    (2, 14, '歩こう', 'Em Am'),
    (2, 15, '涙がこぼれ', 'F G'),
    (2, 16, 'ないように', 'C');
    (2, 17, '泣きながら', 'C Em'),
    (2, 18, '歩く', 'F G'),
    (2, 19, '一人の夜の', 'C Am'),
    (2, 20, '心を', 'F G C');


INSERT INTO sections (song_id, section_name, start_measure, end_measure) VALUES
    (2, 'Aメロ', 1, 4),
    (2, 'Bメロ', 5, 8),
    (2, 'サビ', 9, 16),
    (2, 'Cメロ', 17, 20);
-- sectionsテーブルのサンプルデータ

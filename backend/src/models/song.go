// models/song.go
package models

type Song struct {
	ID       uint      `json:"id" gorm:"primaryKey"`
	Title    string    `json:"title"`
	Artist   string    `json:"artist"`
	Measures []Measure `json:"measures,omitempty" gorm:"foreignKey:SongID"`
	Sections []Section `json:"sections,omitempty" gorm:"foreignKey:SongID"`
}

type Measure struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	SongID        uint   `json:"song_id"`
	MeasureNumber int    `json:"measure_number"`
	Lyrics        string `json:"lyrics"`
	Chords        string `json:"chords"`
}

type Section struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	SongID       uint   `json:"song_id"`
	SectionName  string `json:"section_name"`
	StartMeasure int    `json:"start_measure"`
	EndMeasure   int    `json:"end_measure"`
}

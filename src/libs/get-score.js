export default function getScore(sheet, hits, currentTime) {
  const totalHits = Object.keys(sheet).reduce((total, noteType) => {
    return total + hits[noteType].length;
  }, 0);

  const totalNotes = Object.keys(sheet).reduce((total, noteType) => {
    const notesUntilNow = sheet[noteType]
      .filter(note => note <= currentTime);

    return total + notesUntilNow.length;
  }, 0);

  if (!totalNotes) {
    return 0;
  }

  return Math.round(totalHits / totalNotes * 100);
}

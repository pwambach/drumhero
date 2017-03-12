export default function getHits(playedNotes, sheet, threshold = 0.2) {
  const hits = Object.keys(sheet).map(noteType => {
    return playedNotes[noteType].filter(playedNote => {
      return sheet[noteType].find(note => Math.abs(playedNote - note) < threshold)
    }

    );
  });

  return Object.keys(sheet).reduce((total, noteType, index) => {
    total[noteType] = hits[index];
    return total;
  }, {});
}


export function getEmptyHits(sheet) {
  return Object.keys(sheet).reduce((total, noteType, index) => {
    total[noteType] = [];
    return total;
  }, {});
}

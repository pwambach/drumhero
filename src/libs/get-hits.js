export default function getHits(playedNotes, sheetNotes, threshold = 0.2) {
  const hits = Object.keys(sheetNotes).map(noteType => {
    return playedNotes[noteType].filter(playedNote => {
      return sheetNotes[noteType].find(
        note => Math.abs(playedNote - note) < threshold
      );
    });
  });

  return Object.keys(sheetNotes).reduce(
    (total, noteType, index) => {
      total[noteType] = hits[index];
      return total;
    },
    {}
  );
}

// export function getEmptyHits(sheet) {
//   return Object.keys(sheet).reduce((total, noteType, index) => {
//     total[noteType] = [];
//     return total;
//   }, {});
// }

const inititalState = {
  kick: [
    6.954666666666666,
    9.141333333333332,
    11.365333333333332,
    13.605333333333332,
    15.866666666666665,
    18.064,
    20.272000000000002,
    22.506666666666668,
    24.725333333333335,
    26.944000000000003,
    29.141333333333336,
    31.36,
    33.616,
    35.808,
    38.08533333333333,
    40.928000000000004
  ],
  hihat: [
    4.181333333333333,
    4.746666666666666,
    5.327999999999999,
    5.845333333333333,
    6.389333333333333,
    6.949333333333334,
    7.504,
    8.101333333333333,
    8.645333333333333,
    9.114666666666666,
    9.717333333333332,
    10.298666666666666,
    10.831999999999999,
    11.349333333333332,
    11.904,
    12.458666666666666,
    13.024,
    13.589333333333334,
    14.144,
    14.714666666666664,
    15.258666666666665,
    15.850666666666667,
    16.39466666666667,
    16.944000000000003,
    17.504,
    18.04266666666667,
    18.592000000000002,
    19.130666666666666,
    19.706666666666667,
    20.261333333333333,
    20.805333333333333,
    21.36,
    21.925333333333334,
    22.49066666666667,
    23.040000000000003,
    23.6,
    24.16,
    24.714666666666666,
    25.285333333333334,
    25.84,
    26.389333333333333,
    26.938666666666666,
    27.49866666666667,
    28.069333333333333,
    28.581333333333333,
    29.125333333333334,
    29.712000000000003,
    30.229333333333336,
    30.784,
    31.354666666666667,
    31.893333333333338,
    32.45333333333333,
    33.029333333333334,
    33.61066666666667,
    34.160000000000004,
    34.714666666666666,
    35.25333333333334,
    35.818666666666665,
    36.352000000000004,
    36.885333333333335,
    37.504,
    38.06933333333333,
    38.61333333333334,
    39.178666666666665,
    39.712,
    40.272,
    40.832,
    41.45066666666667,
    41.78666666666667,
    42.048
  ],
  snare: [],
  tom1: [],
  tom2: [],
  tom3: [],
  cymbal1: []
};

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// selector
export function sheetNotesSelector(state) {
  return state.sheetNotes;
}

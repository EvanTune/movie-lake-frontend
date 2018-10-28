function getScoreColorFromScore(score) {

  if (score >= 6.5) {
    return 'green';
  } else if (score >= 4.5) {
    return 'yellow';
  } else {
    return 'red';
  }

}

export { getScoreColorFromScore };

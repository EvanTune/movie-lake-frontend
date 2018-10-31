function truncateText(string, limit) {

  if (string.length > limit) {
    return string.substr(0, limit) + '...';
  } else {
    return string;
  }

}

export {truncateText};

const validateEmbededReport = (link) => {
  if (link.includes("embed")) {
    return link;
  } else {
    const eLink = link.replace("/reporting", "/embed/reporting");
    return eLink;
  }
};

export { validateEmbededReport };

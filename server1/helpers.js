const pagination = async (
  model,
  matches,
  populate,
  sort,
  page,
  size,
  fields
) => {
  let skip, limit;
  if (page && size) {
    skip = size * (page - 1);
    limit = size;
  }
  // if (matches?.name) {
  //   matches["name"] = {
  //     $regex: matches?.name,
  //     $options: "i",
  //   };
  // }

  const total = await model.countDocuments(matches);
  const results = await model
    .find(matches, fields)
    .populate(populate)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    total,
    results,
  };
};

module.exports = { pagination };

const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, startdate, tag } = req.query;

    const data = await getEventsService({
      page: Number(page),
      limit: Number(limit),
      name,
      startdate,
      tag,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { getEventsService } = require('../services/event-service');

const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await getEventsService(Number(page), Number(limit));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEvents };

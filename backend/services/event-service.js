const supabase = require('../database/db');

const getEventsService = async ({ page, limit, name, startdate, tag }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('events')
    .select(`
      id,
      name,
      description,
      start_date,
      duration_in_minutes,
      price,
      enabled_for_enrollment,
      max_assistance,
      users (
        id,
        first_name,
        last_name,
        username
      ),
      event_locations (
        id,
        name,
        full_address,
        latitude,
        longitude
      ),
      event_tags (
        tags (
          id,
          name
        )
      )
    `)
    .range(from, to);

  // Filtros dinámicos
  if (name) {
    query = query.ilike('name', `%${name}%`);
  }

  if (startdate) {
    query = query.eq('start_date', startdate);
  }

  if (tag) {
    // Buscar eventos que tengan al menos un tag con ese nombre
    query = query.contains('event_tags.tags.name', [tag]); // usamos contains con el array
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};

module.exports = { getEventsService };

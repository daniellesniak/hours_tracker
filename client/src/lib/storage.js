// LocalStorage utility for managing hour entries

const STORAGE_KEY = 'hours_tracker_data';

// Get all hours from localStorage
export const getAllHours = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Get hours for a specific date
export const getHoursByDate = (date) => {
  const allHours = getAllHours();
  return allHours
    .filter(hour => hour.date === date)
    .sort((a, b) => a.time_from.localeCompare(b.time_from));
};

// Add a new hour entry
export const addHour = (date, timeFrom, timeTo) => {
  const allHours = getAllHours();
  const newHour = {
    id: Date.now(), // Simple ID generation
    date,
    time_from: timeFrom,
    time_to: timeTo,
    created_at: new Date().toISOString(),
  };
  allHours.push(newHour);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allHours));
  return newHour;
};

// Update an hour entry
export const updateHour = (id, timeFrom, timeTo) => {
  const allHours = getAllHours();
  const index = allHours.findIndex(hour => hour.id === id);
  if (index !== -1) {
    allHours[index] = {
      ...allHours[index],
      time_from: timeFrom,
      time_to: timeTo,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHours));
    return allHours[index];
  }
  return null;
};

// Delete an hour entry
export const deleteHour = (id) => {
  const allHours = getAllHours();
  const filtered = allHours.filter(hour => hour.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

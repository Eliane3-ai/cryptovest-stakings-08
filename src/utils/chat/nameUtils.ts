import { countrySpecificNames, maleNames, femaleNames, lastNames } from './chatData';

// Generate random number between min and max (inclusive)
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random avatar URL that matches the country/gender of the user
export const getRandomAvatar = (gender: string, country: string, index: number) => {
  // Here we would ideally have country-specific avatars, but for now we'll just use the generic ones
  return `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${index % 100}.jpg`;
};

// Get a name appropriate for the country and gender
export const getCountrySpecificName = (country: string, gender: 'male' | 'female'): {firstName: string, lastName: string} => {
  // If we have specific names for this country, use them
  if (countrySpecificNames[country]) {
    const names = countrySpecificNames[country];
    const namesList = gender === 'male' ? names.male : names.female;
    const firstName = namesList[getRandomInt(0, namesList.length - 1)];
    const lastName = names.lastNames[getRandomInt(0, names.lastNames.length - 1)];
    return { firstName, lastName };
  }
  
  // Otherwise use the generic pool
  const firstName = gender === 'male' 
    ? maleNames[getRandomInt(0, maleNames.length - 1)] 
    : femaleNames[getRandomInt(0, femaleNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  
  return { firstName, lastName };
};

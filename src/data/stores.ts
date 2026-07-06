import type { FranchiseStore } from './types'

/**
 * The existing franchise network. Coordinates are real city centroids so the
 * map renders honestly; revenue and performance are demo seed values.
 */
export const STORES: FranchiseStore[] = [
  { id: 'st-01', name: 'Decathlon Lille Campus', city: 'Lille', country: 'France', lat: 50.633, lng: 3.066, format: 'Full Store', opened: '2021-03-15', annualRevenue: 15_800_000, performance: 'Outperforming' },
  { id: 'st-02', name: 'Decathlon Paris Rive Gauche', city: 'Paris', country: 'France', lat: 48.857, lng: 2.352, format: 'City Store', opened: '2022-06-01', annualRevenue: 11_400_000, performance: 'Outperforming' },
  { id: 'st-03', name: 'Decathlon Lyon Part-Dieu', city: 'Lyon', country: 'France', lat: 45.764, lng: 4.836, format: 'Full Store', opened: '2021-09-20', annualRevenue: 12_100_000, performance: 'On Target' },
  { id: 'st-04', name: 'Decathlon Marseille Prado', city: 'Marseille', country: 'France', lat: 43.296, lng: 5.37, format: 'Full Store', opened: '2022-02-10', annualRevenue: 9_600_000, performance: 'On Target' },
  { id: 'st-05', name: 'Decathlon Bordeaux Lac', city: 'Bordeaux', country: 'France', lat: 44.838, lng: -0.579, format: 'Full Store', opened: '2023-04-05', annualRevenue: 8_900_000, performance: 'On Target' },
  { id: 'st-06', name: 'Decathlon Toulouse Capitole', city: 'Toulouse', country: 'France', lat: 43.605, lng: 1.444, format: 'City Store', opened: '2023-10-18', annualRevenue: 6_700_000, performance: 'Underperforming' },
  { id: 'st-07', name: 'Decathlon Brussels Centre', city: 'Brussels', country: 'Belgium', lat: 50.85, lng: 4.352, format: 'Full Store', opened: '2022-05-12', annualRevenue: 10_200_000, performance: 'On Target' },
  { id: 'st-08', name: 'Decathlon Antwerp Meir', city: 'Antwerp', country: 'Belgium', lat: 51.22, lng: 4.402, format: 'City Store', opened: '2024-01-25', annualRevenue: 5_800_000, performance: 'On Target' },
  { id: 'st-09', name: 'Decathlon Madrid Castellana', city: 'Madrid', country: 'Spain', lat: 40.417, lng: -3.703, format: 'Full Store', opened: '2021-11-08', annualRevenue: 13_500_000, performance: 'Outperforming' },
  { id: 'st-10', name: 'Decathlon Barcelona Glòries', city: 'Barcelona', country: 'Spain', lat: 41.387, lng: 2.17, format: 'Full Store', opened: '2022-08-30', annualRevenue: 12_800_000, performance: 'Outperforming' },
  { id: 'st-11', name: 'Decathlon Milano Centrale', city: 'Milan', country: 'Italy', lat: 45.464, lng: 9.19, format: 'Full Store', opened: '2022-11-14', annualRevenue: 11_900_000, performance: 'On Target' },
  { id: 'st-12', name: 'Decathlon München Ost', city: 'Munich', country: 'Germany', lat: 48.135, lng: 11.582, format: 'Full Store', opened: '2023-03-22', annualRevenue: 10_800_000, performance: 'On Target' },
  { id: 'st-13', name: 'Decathlon Berlin Alexanderplatz', city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405, format: 'City Store', opened: '2024-05-16', annualRevenue: 6_200_000, performance: 'Underperforming' },
  { id: 'st-14', name: 'Decathlon Warszawa Centrum', city: 'Warsaw', country: 'Poland', lat: 52.23, lng: 21.011, format: 'Full Store', opened: '2023-07-03', annualRevenue: 8_400_000, performance: 'Outperforming' },
]

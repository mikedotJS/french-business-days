# French Business Days

## Description

`french-business-days` is a Node.js command-line tool that calculates the number of business days (excluding weekends and French public holidays) within a specified date range. This tool is particularly useful for businesses and individuals who need to plan around non-working days in France.

## Features

- Calculate business days for any month and year.
- Exclude weekends and French public holidays.
- Customizable start and end days within a month.

## Installation

To install the package globally, run:

```bash
npm install -g french-business-days
```

## Usage

You can use the `french-business-days` command in your terminal:

```bash
french-business-days --month <1-12> --year <YYYY> [--start-day <1-31>] [--end-day <1-31>]
```

### Example

Calculate business days for March 2023:

```bash
french-business-days --month 3 --year 2023
```

Calculate business days from March 10 to March 20, 2023:

```bash
french-business-days --month 3 --year 2023 --start-day 10 --end-day 20
```

## API

### Function: `countBusinessDays`

- **Description**: Calculates the number of business days in a given month and year, excluding weekends and French public holidays.
- **Parameters**:
  - `month`: `number` - The month for which to calculate business days (1-12).
  - `year`: `number` - The year for which to calculate business days.
  - `startDay`: `number` (optional) - The starting day of the month (default is 1).
  - `endDay`: `number` (optional) - The ending day of the month (default is the last day of the month).
- **Returns**: `number` - The count of business days.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need to calculate business days in France.
- Utilizes the algorithm for calculating Easter to determine related holidays.
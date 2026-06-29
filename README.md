# Payroll Calculation Adapter

Enterprise-style backend adapter built with Node.js, TypeScript and Express.

This project simulates a payroll integration service that receives associate calculation requests, responds asynchronously, enriches payroll data, validates business rules, maps the data into a calculation-engine format, and updates the calculation status.

## Main Flow

Client request → Payroll Adapter → Async response → Payroll Builder → Validation → Calculation Engine → Status update

## Main Technologies

- Node.js
- TypeScript
- Express
- Zod
- Pino
- Jest
- ESLint
- Prettier
- Docker
- Swagger/OpenAPI

## Project Goal

This project is designed as a professional portfolio project focused on backend integrations, async processing, observability, validation, testing and enterprise architecture.

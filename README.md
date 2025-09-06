# MyDropbox - File Storage Application

A simple file storage and sharing application built with Java Spring Boot backend and React frontend.

## What This Application Does

- Upload files (TXT, JPG, PNG, JSON)
- View uploaded files in a clean interface
- Download files
- View file content directly in the browser
- Store file information in a PostgreSQL database

## Technologies Used

- **Backend**: Java 17, Spring Boot, PostgreSQL
- **Frontend**: React, TypeScript
- **Containerization**: Docker, Docker Compose
- **Database**: PostgreSQL

## How to Run the Application

### Step 1: Clone the Repository

```bash
git clone https://github.com/bansal02/dropbox.git
cd dropbox
```

### Step 2: Navigate to the Application Folder

```bash
cd dropbox-app
```

### Step 3: Start the Application

Run this simple command to start everything:

```bash
./start.sh
```

### Step 4: Access the Application

Once the script completes, you can access:

- **Web Application**: http://localhost:3000
- **Backend API**: http://localhost:8080/api/files -> /list, /download/{fileId}, /view/{fileId}

### If Docker is not running:
- Start Docker Desktop
- Wait for it to fully load
- Try running `./start.sh` again

### If ports are already in use:
- Stop other applications using ports 3000, 8080, or 5432
- Or run: `docker compose down` to stop existing containers

## Project Structure

```
dropbox-app/
├── backend/           # Java Spring Boot application
├── frontend/          # React application
├── docker-compose.yml # Container
└── start.sh          # Easy startup script
```

### Services:
- **frontend**: React app (port 3000)
- **backend**: Spring Boot API (port 8080)
- **postgres**: PostgreSQL database (port 5432)
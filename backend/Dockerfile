# Use a specific Python base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /backend

# Copy the entire Django project into the working directory
COPY . /backend

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends gcc

# Set the environment variable for the virtual environment path
ENV VIRTUAL_ENV="/MemAssist-E"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Use the existing virtual environment and install the application dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Use Gunicorn for production
CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000"]
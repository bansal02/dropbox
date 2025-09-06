FROM openjdk:17-jdk-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl maven && rm -rf /var/lib/apt/lists/*
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests
RUN mkdir -p /app/uploads
EXPOSE 8080
CMD ["java", "-jar", "target/file-storage-0.0.1-SNAPSHOT.jar"]

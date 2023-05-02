FROM amazoncorretto:17
WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY ./src ./src

RUN ./mvnw clean install

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar ./target/recipes-service.jar"]


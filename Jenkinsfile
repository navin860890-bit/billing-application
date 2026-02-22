pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-web-app"
        CONTAINER_NAME = "my-web-app-container"
        PORT = "9090"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove container if it already exists
                    sh """
                        if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                            docker rm -f ${CONTAINER_NAME}
                        fi
                    """
                    // Run new container on port 9090
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 ${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Container '${CONTAINER_NAME}' should be running on port ${PORT}."
        }
    }
}


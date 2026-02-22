pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-web-app"
        CONTAINER_NAME = "my-web-app-container"
        HOST_PORT = "9090"
        CONTAINER_PORT = "80"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh """
                        if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                            docker rm -f ${CONTAINER_NAME}
                        fi
                        docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. App should be available at http://localhost:${HOST_PORT}"
        }
    }
}



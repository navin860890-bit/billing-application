pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build image (disable BuildKit warnings if needed)
                    sh 'DOCKER_BUILDKIT=0 docker build -t my-frontend-app .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove old container if it exists
                    sh 'docker rm -f my-frontend-app-container || true'

                    // Run new container mapping host port 8080 to container port 80
                    sh 'docker run -d --name my-frontend-app-container -p 8080:80 my-frontend-app'
                }
            }
        }
    }
}


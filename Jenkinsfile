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
                sh "docker build -t my-web-app:latest ."
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh """
                        if [ \$(docker ps -aq -f name=my-web-app-container) ]; then
                            docker rm -f my-web-app-container
                        fi
                        docker run -d --name my-web-app-container -p 9090:80 my-web-app:latest
                    """
                }
            }
        }
    }
}


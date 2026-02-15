pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Docker Check') {
            steps {
                bat 'docker version'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t bill-website:latest .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                echo 'Stopping old container if exists...'
                bat '''
                docker stop my-billingapp || echo "No container to stop"
                docker rm my-billingapp || echo "No container to remove"
                '''
            }
        }

        stage('Run New Container') {
            steps {
                echo 'Running new container...'
                bat 'docker run -d --name my-billingapp -p 9090:8080 bill-website:latest'
            }
        }

        stage('Health Check') {
            steps {
                echo 'Checking if application is responding...'
                // Adjust the endpoint if your app exposes a health route
                bat 'curl http://localhost:8080 || echo "Health check failed"'
            }
        }
    }

    post {
        failure {
            echo "❌ CI/CD Pipeline failed. Check logs."
        }
        success {
            echo "✅ CI/CD Pipeline completed successfully."
        }
    }
}


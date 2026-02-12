pipeline {
    agent any

    environment {
        IMAGE_NAME = "bill-website"
        CONTAINER_NAME = "bill-website"
        HOST_PORT = "9091"
        CONTAINER_PORT = "80"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Docker Check') {
            steps {
                echo 'Checking Docker availability...'
                bat 'docker version'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                echo 'Stopping old container if exists...'
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                '''
            }
        }

        stage('Run New Container') {
            steps {
                echo 'Running new container...'
                bat """
                docker run -d ^
                  -p %HOST_PORT%:%CONTAINER_PORT% ^
                  --name %CONTAINER_NAME% ^
                  %IMAGE_NAME%
                """
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline completed successfully!'
            echo '🌐 App running at http://localhost:9091'
        }
        failure {
            echo '❌ CI/CD Pipeline failed. Check logs.'
        }
    }
}

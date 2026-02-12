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
                echo 'Checking Docker availability...'
                bat 'docker version'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t bill-website .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                echo 'Stopping old container if exists...'
                bat 'docker stop bill-website || exit 0'
                bat 'docker rm bill-website || exit 0'
            }
        }

        stage('Run New Container') {
            steps {
                echo 'Running new container...'
                bat '''
                docker run -d ^
                -p 9091:80 ^
                --name bill-website ^
                bill-website
                '''
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

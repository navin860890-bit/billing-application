pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/navin860890-bit/billing-application.git'
            }
        }

        stage('Check Docker') {
            steps {
                bat 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t bill-website .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop bill-container || exit 0'
                bat 'docker rm bill-container || exit 0'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 8081:80 --name bill-container bill-website'
            }
        }

    }
}

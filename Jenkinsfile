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
                sh 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t bill-website .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop bill-container || true'
                sh 'docker rm bill-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 8081:80 --name bill-container bill-website'
            }
        }

    }
}

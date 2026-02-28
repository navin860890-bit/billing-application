pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t bill-website .'
            }
        }

        stage('Remove Old Container') {
            steps {
                bat 'docker rm -f myapp || exit 0'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 9090:8080 --name myapp bill-website'
            }
        }
    }
}

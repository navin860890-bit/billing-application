pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "naveen-website"
        CONTAINER_NAME = "naveen-site"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f $CONTAINER_NAME || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 9090:80 --name $CONTAINER_NAME $IMAGE_NAME'
            }
        }
    }
}

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
                git branch: 'main',
                    url: 'https://github.com/<your-username>/<your-repo>.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh '''
                docker rm -f $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                docker run -d \
                  -p $HOST_PORT:$CONTAINER_PORT \
                  --name $CONTAINER_NAME \
                  $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! App running on http://localhost:${HOST_PORT}"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}

pipeline {
    agent any

    environment {
        IMAGE_NAME = "bill-website"
        CONTAINER_NAME = "bill-website"
        HOST_PORT = "9091"
        CONTAINER_PORT = "80"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                echo "Removing old container if exists..."
                sh 'docker rm -f $CONTAINER_NAME || true'
            }
        }

        stage('Run New Container') {
            steps {
                echo "Starting new container..."
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
            echo "✅ App deployed successfully at http://localhost:${HOST_PORT}"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo"
        DOCKER_REGISTRY = 'https://index.docker.io/v1/'
        DOCKER_CREDENTIALS_ID = 'docker-hub'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('server') {
                    echo 'Installing Node.js dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('server') {
                    echo 'Building the app for production...'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    echo 'Building and pushing Docker image...'

                    // Using withCredentials to provide Docker login credentials
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Manually login to Docker Hub
                        sh "echo '${DOCKER_PASSWORD}' | docker login -u '${DOCKER_USERNAME}' --password-stdin"

                        // Build Docker image
                        sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."

                        // Push the image to Docker Hub
                        sh "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
                    }
                }
            }
        }

        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA environment...'
            }
        }

        stage('Test') {
            steps {
                dir('server') {
                    echo 'Running tests...'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for errors.'
        }
    }
}

// pipeline {
//     agent any
//     triggers {
//         pollSCM('H/5 * * * *')
//     }
//     stages {
//         stage('Build') {
//             steps {
//                 echo "Building.."
//                 sh '''
//                 echo "doing build stuff.."
//                 '''
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo "Testing.."
//                 sh '''
//                 echo "doing test stuff.."
//                 '''
//             }
//         }
//         stage('Deliver') {
//             steps {
//                 echo 'Deliver....'
//                 sh '''
//                 echo "doing delivery stuff.."
//                 '''
//             }
//         }
//     }
// }
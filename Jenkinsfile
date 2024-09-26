pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // Node.js version configured in Global Tool Configuration
    }

    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Replace with your Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-hub' // The ID of your Docker Hub credentials in Jenkins
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

                    // Using withCredentials for Docker login
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Disable Docker TLS cert validation (if applicable)
                        sh '''
                            export DOCKER_TLS_VERIFY=""
                            export DOCKER_CERT_PATH=""
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        '''

                        // Build Docker image
                        sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."

                        // Push Docker image to Docker Hub
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
                    // Add actual test command here
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
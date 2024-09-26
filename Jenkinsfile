pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // Node.js version configured in Global Tool Configuration
    }

    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Your Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-hub' // Your Docker credentials ID in Jenkins
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

                    // Using docker.withRegistry for Docker Hub authentication
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        // Build Docker image
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").build(".")

                        // Push Docker image to Docker Hub
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").push()
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
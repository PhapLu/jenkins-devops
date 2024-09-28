pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18' // Your configured Node.js version
    }
    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Your Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-hub' // Your Docker credentials ID
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
                    try {
                        docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_CREDENTIALS_ID}") {
                            def customImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                            customImage.push()
                        }
                    } catch (Exception e) {
                        echo "Error during Docker build and push: ${e.message}"
                        throw e // Re-throw exception to fail the build
                    }
                }
            }
        }
        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA environment...'
                // Implement deployment steps or scripts
            }
        }
        stage('Test') {
            steps {
                dir('server') {
                    echo 'Running tests...'
                    sh 'npm test'
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
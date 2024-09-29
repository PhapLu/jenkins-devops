pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18' // Your configured Node.js version
    }
    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Your Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-cre' // Your Docker credentials ID
    }
    triggers {
        pollSCM('H/5 * * * *') // Poll every 5 minutes
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
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_CREDENTIALS_ID}") {
                        // Adjust the context and path to the Dockerfile
                        def customImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}", "server/")
                        customImage.push()
                    }
                }
            }
        }
        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA environment...'
                // Implement your QA deployment logic here
            }
        }
        stage('Test') {
            steps {
                dir('server') {
                    echo 'Running tests...'
                    // Uncomment and run the actual tests when ready
                    // sh 'npm test'
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
# SCK DEVOPS IN ACTION WORKSHOP

## Day 1

1. [ที่มาและลักษณะของระบบในรูปแบบของ Container](#1-ที่มาและลักษณะของระบบในรูปแบบของ-container)
2. [การพัฒนาระบบด้วย Docker](#2-การพัฒนาระบบด้วย-docker)
3. [บริหารจัดการกรณีมี Container หลายตัวด้วย Docker compose](#3-บริหารจัดการกรณีมี-container-หลายตัวด้วย-docker-compose)

## Day 2

4. [บริหารและจัดการ Container ด้วย Kubernetes](#4-บริหารและจัดการ-container-ด้วย-kubernetes)

## Day 3

5. [เริ่มต้นใช้งาน Kubernetes เบื้องต้น](#5-เริ่มต้นใช้งาน-kubernetes-เบื้องต้น)
6. [กระบวนการพัฒนาสู่กระบวนการส่งมอบ (Development to Deployment)](#6-กระบวนการพัฒนาสู่กระบวนการส่งมอบ-development-to-deployment)

## Day 4

7. [Continuous Integration](#7-continuous-integration)
8. [Continuous Delivery](#8-continuous-delivery)

## Day 5

9. [การดูแลระบบ และ Observability](#9-การดูแลระบบ-และ-observability)

---

## 1. ที่มาและลักษณะของระบบในรูปแบบของ Container

- ที่มาและปัญหาในการพัฒนาระบบแบบเดิม
- ความแตกต่างของ Virtual Machine และ Container Base
- แนวทางในการพัฒนาระบบ ตามหลักการ Container
  - [12 factors app](https://12factor.net/)
  - [container principle](https://kubernetes.io/blog/2018/03/principles-of-container-app-design/)

---

## 2. การพัฒนาระบบด้วย Docker

- Image
- Container
- Registry
- คำสั่งพื้นฐานของ Docker
  - กลุ่มคำสั่งของ image
  - กลุ่มคำสั่งของ container
  - กลุ่มคำสั่งของ registry
  - กลุ่มคำสั่งอื่น ๆ ที่ใช้บ่อย
- การเขียน Dockerfile
  - เปลี่ยนจากคำสั่ง เป็น Dockerfile
  - ความหมายของ Dockerfile instructions
  - แนวทางการเขียน และข้อควรระวัง

---

## 3. บริหารจัดการกรณีมี Container หลายตัวด้วย Docker compose

การออกแบบขั้นตอนการพัฒนา และ ใช้งานในกรณีที่มี Container มากกว่า 1ตัว ด้วย Docker compose

- ข้อแตกต่างของ Docker และ Docker compose
- วิธีเขียนไฟล์ Docker compose
- คำสั่งการใช้งาน
- ความหมายของแต่ละ Fields หรือ Properties

ตัวอย่างการสร้างระบบงานด้วย Docker compose

- Frontend Web
- Backend API
- Database
- Testing

---

## 4. บริหารและจัดการ Container ด้วย Kubernetes

- ที่มาของ Kubernetes
- Kubernetes Key Features
- Kubernetes Architecture
  - Master node
    - API Server
    - Scheduler
    - Controller Manager
    - ETCD
  - Worker node
    - Container Runtime
    - Kubelet
    - Kube Proxy

---

## 5. เริ่มต้นใช้งาน Kubernetes เบื้องต้น

ใช้งาน Kubernetes ด้วย Command line

- Kubectl

สร้างและปรับแต่ง Resources ของ Kubernetes

- Pods
- Deployments
- Services
  - ClusterIP
  - NodePort
  - LoadBalancer
  - ExternalName
- Ingress

Helm Package Manager

- คืออะไร
- ลองใช้งาน

---

## 6. กระบวนการพัฒนาสู่กระบวนการส่งมอบ (Development to Deployment)

- ที่มา ทำไมและปัญหาของการส่งมอบ
- DevOps vs Traditional Approach
- DevOps Culture
  - People - Process - Tools
- การนำมาปรับใช้
- Continuous Integration and Delivery/Deployment
- ออกแบบ และสร้าง Pipeline เพื่อส่งมอบงานอย่างมีคุณภาพ
  - ใช้งานร่วมกับ Git source code version control
  - ใช้งานร่วมกับ Continuous Integration
    - Build
    - Static code analysis
    - Test / Coverage
    - Push Artifacts

---

## 7. Continuous Integration

- Continuous Integration คืออะไร, เข้าใจ และนำไปปรับใช้
- หลักปฏิบัติที่ควรทำ
- ออกแบบ Continuous Integration และเริ่มต้นใช้งาน
  - Build
  - Static code analysis
  - Test
  - Get feedback
- Static code analysis
  - SonarQube
  - Linter
- Automated tests
  - Unit
  - Integration
  - End to end
- ทดลองทำ โดยใช้งานร่วมกับ Docker
- ทดลองส่งมอบงานบน Kubernetes ด้วย Jenkins(on premise)
  - Jenkins -> k3d[dev namespace] + database

---

## 8. Continuous Delivery

- Continuous Delivery คืออะไร, เข้าใจ และนำไปปรับใช้
- Continuous Delivery และ Continuous Deployment
- หลักปฏิบัติที่ควรทำ
- Deployment Strategies
- ทดลองส่งมอบงานบน Kubernetes ด้วย Jenkins
  - Jenkins -> k3d[uat namespace]

---

## 9. การดูแลระบบ และ Observability

- มุมมองของ Observability
  - Metrics
  - Traces
  - Logs
- Push, pull mechanism
- สร้างระบบ Monitoring ผ่านเครื่องมือ เช่น
  - Prometheus
  - Grafana
  - Opentelemetry

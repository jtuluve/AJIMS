/** @type {import('next').NextConfig} */
const nextConfig = {experimental:{
    serverActions:{
        allowedForwardedHosts: ['localhost',"humble-cod-9g76wjjgv437xjx-3000.app.github.dev"],
        allowedOrigins: ["humble-cod-9g76wjjgv437xjx-3000.app.github.dev","localhost:3000"]
    }
}}

module.exports = nextConfig

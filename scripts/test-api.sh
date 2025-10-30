#!/bin/bash

# ICON48 API Test Script
# Quick tests to verify API is working

set -e

API_URL="${API_URL:-http://localhost:3000}"

echo "🧪 Testing ICON48 API"
echo "===================="
echo "API URL: $API_URL"
echo ""

# Test 1: Health check (home page)
echo "Test 1: Health Check"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL")
if [ "$response" == "200" ]; then
    echo "✅ API is responding"
else
    echo "❌ API is not responding (HTTP $response)"
    exit 1
fi
echo ""

# Test 2: Signup
echo "Test 2: User Signup"
SIGNUP_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-'$(date +%s)'@example.com",
    "password": "testpassword123",
    "fullName": "Test User"
  }')

if echo "$SIGNUP_RESPONSE" | grep -q "access_token"; then
    echo "✅ Signup successful"
    TOKEN=$(echo "$SIGNUP_RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
else
    echo "❌ Signup failed"
    echo "$SIGNUP_RESPONSE"
    exit 1
fi
echo ""

# Test 3: Get Profile
echo "Test 3: Get Profile"
PROFILE_RESPONSE=$(curl -s "$API_URL/api/auth/profile" \
  -H "Authorization: Bearer $TOKEN")

if echo "$PROFILE_RESPONSE" | grep -q "profile"; then
    echo "✅ Profile retrieved"
else
    echo "❌ Failed to get profile"
    echo "$PROFILE_RESPONSE"
    exit 1
fi
echo ""

# Test 4: Create Workspace
echo "Test 4: Create Workspace"
WORKSPACE_RESPONSE=$(curl -s -X POST "$API_URL/api/workspaces" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Workspace",
    "slug": "test-workspace-'$(date +%s)'"
  }')

if echo "$WORKSPACE_RESPONSE" | grep -q "workspace"; then
    echo "✅ Workspace created"
    WORKSPACE_ID=$(echo "$WORKSPACE_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
else
    echo "❌ Failed to create workspace"
    echo "$WORKSPACE_RESPONSE"
    exit 1
fi
echo ""

# Test 5: List Workflows
echo "Test 5: List Workflows"
WORKFLOWS_RESPONSE=$(curl -s "$API_URL/api/workflows?workspaceId=$WORKSPACE_ID" \
  -H "Authorization: Bearer $TOKEN")

if echo "$WORKFLOWS_RESPONSE" | grep -q "workflows"; then
    echo "✅ Workflows retrieved"
else
    echo "❌ Failed to list workflows"
    echo "$WORKFLOWS_RESPONSE"
    exit 1
fi
echo ""

# Test 6: List Agents
echo "Test 6: List Agents"
AGENTS_RESPONSE=$(curl -s "$API_URL/api/agents?workspaceId=$WORKSPACE_ID" \
  -H "Authorization: Bearer $TOKEN")

if echo "$AGENTS_RESPONSE" | grep -q "agents"; then
    echo "✅ Agents retrieved"
else
    echo "❌ Failed to list agents"
    echo "$AGENTS_RESPONSE"
    exit 1
fi
echo ""

echo "✅ All tests passed!"
echo ""
echo "Your ICON48 API is working correctly! 🎉"



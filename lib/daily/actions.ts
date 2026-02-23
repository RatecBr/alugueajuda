
'use server'

export async function createRoom() {
  const apiKey = process.env.DAILY_API_KEY

  if (!apiKey) {
    return { error: 'Daily API Key not configured' }
  }

  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          exp: Math.round(Date.now() / 1000) + 60 * 60, // 1 hour expiration
          enable_chat: true,
        },
      }),
    })

    const room = await response.json()
    
    if (room.error) {
        return { error: room.error }
    }

    return { url: room.url, name: room.name }
  } catch (error) {
    console.error('Error creating Daily room:', error)
    return { error: 'Failed to create room' }
  }
}

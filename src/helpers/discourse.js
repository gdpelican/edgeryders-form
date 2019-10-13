import generatePassword from 'secure-random-string'

const createUser = form => (
  fetch(`${process.env.VUE_APP_DISCOURSE_USER_URL}?${Object.entries({
    accepted_gtc: true,
    accepted_privacy_policy: true,
    edgeryders_research_content: true,
    requested_api_keys: ['edgeryders.eu'],
    auth_key: process.env.VUE_APP_DISCOURSE_USER_KEY,
    email: formField(form, 'email'),
    username: generateUsername(form),
    password: generatePassword({ length: 15 })
  }).map(pair => pair.map(encodeURIComponent).join('=')).join('&')}`)
)

const createTopic = form, key => (
  fetch(process.env.VUE_APP_DISCOURSE_TOPIC_URL, {
    method: 'post',
    headers: { 'Api-Key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `Rethinking retirement - response by ${formField(form, 'email')}`,
      raw: generateResponse(form)
    })
  })
)

const formField = (form, field) => (
  Object.values(form).map(f => (f[field] || {}).value)
)

const generateUsername = form => (
  [
    formField(form, 'email').split('@')[0],
    Math.ceil(Math.random() * 100)
  ].join('_')
)

const generateResponse = form => (
  Object.values(form).map(({ body, ...fields }) => (
    [
      `**${body}**`,
      Object.entries(fields).map(([field, { value }]) => (
        `${field === 'message' ? '' : `**${field}:** `}${value}`
      )).join('\n')
    ]
  )).flat().join('\n\n')
)

export default form => (
  createTopic(form, process.env.VUE_APP_DISCOURSE_TOPIC_KEY)
)

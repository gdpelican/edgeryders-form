const createUser = ({ form, url, authKey }) => (
  fetch(`${url}?${Object.entries({
    email: '',
    username: generateUsername(form),
    password: generatePassword(form),
    accepted_gtc: true,
    accepted_privacy_policy: true,
    edgeryders_research_content: true,
    requested_api_keys: ['edgeryders.eu'],
    auth_key: authKey
  }).map(v => v.join('=')).join('&')}`)
)

const createTopic = ({ form, url }) => (
  fetch(url, { body: format(form) })
)

const generateUsername = form => (
  form[0]
)

const generatePassword = form => (
  form[0]
)

const format = form => (
  Object.values(form).map(({ body, ...fields }) => (
    [
      `**${body}**`,
      Object.entries(fields).map(([field, { value }]) => (
        `${field === 'message' ? '' : `**${field}:** `}${value}`
      )).join('\n')
    ]
  )).flat().join('\n\n')
)

export default ({ urls: { user, topic }, authKey }) => (
  form => (
    createUser({ form, url: user, authKey }).then(() => (
      createTopic({ form, url: topic })
    ))
  )
)

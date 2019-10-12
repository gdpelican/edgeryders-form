import passwordGenerator from 'secure-random-string'

const createUser = form => (
  fetch(`${process.env.VUE_APP_DISCOURSE_USER_URL}?${Object.entries({
    accepted_gtc: true,
    accepted_privacy_policy: true,
    edgeryders_research_content: true,
    requested_api_keys: ['edgeryders.eu'],
    auth_key: process.env.VUE_APP_DISCOURSE_USER_KEY,
    ...generateForm(form)
  }).map(v => v.join('=')).join('&')}`)
)

const createTopic = form => (
  fetch(process.env.VUE_APP_DISCOURSE_TOPIC_URL, {
    method: 'post',
    headers: {
      'Api-Key': process.env.VUE_APP_DISCOURSE_TOPIC_KEY,
      'Api-Username': 'gdpelican', // TODO
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title: `Rethinking retirement - response by ${formField(form, 'name')}`,
      category: 343, // TODO
      raw: formatResponse(form)
    })
  })
)

const generateForm = form => ({
  email: formField(form, 'email'),
  username: 'gdpelican_test', //TODO
  password: passwordGenerator({ length: 15 })
})

const formField = (form, field) => (
  Object.values(form).map(f => (f[field] || {}).value)
)

const formatResponse = form => (
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
  createUser(form).then(
    () => createTopic(form),
    console.log
  )
)

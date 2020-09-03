export default async ({
  promise,
  onResponse = () => {},
  onLoad = () => {},
  onError = () => {},
  onComplete = () => {}
}) => {
  onLoad(true)
  try {
    onResponse(await promise)
  } catch (error) {
    onError(error)
  } finally {
    onLoad(false)
    onComplete()
  }
}
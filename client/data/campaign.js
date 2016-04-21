import axios from 'axios'
import fileHelper from './fileHelper'

export function createCampaign(campaignObj) {
  return axios.post('/api-campaign/campaigns', campaignObj)
    .then(res => res.data.data);
}

export function updateCampaign(accessToken, campaignObj) {
  return axios.put(`/api-campaign/campaigns/${campaignObj.campaignId}?token=${accessToken}`, campaignObj)
    .then(res => res.data.data);
}


export function getCampaign(accessToken) {
  return axios.get(`/api-campaign/campaigns/byToken/${accessToken}`)
    .then(res => res.data.data);
}

export function getCampaignBySlug(slug, accessToken) {

  //curl -i -XGET 'localhost:4568/campaigns/bySlug/testcampaign-1461143741?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYzY3OTc4MzIyZTVmYmQ3NjA0ZThkYjJhZDBlODlhYjFmYzRiN2RlZTBhOWE5NjU1ZmI2NjJiOGFlNjQ3ZTcxIn0.gAarGBEnQf11oc8h2bfyaiLoBYGOiaj_Lrjb-KV_SL5GZECE7j50wegLkI7ea1RfNAZBhFFa6LV4IPJQ7I3rjA'

  return axios.get(`/api-campaign/campaigns/bySlug/${slug}?token=${accessToken}`)
    .then(res => res.data);
}

export function addCampaignPhoto(accessToken, campaignId, file) {

  let path = `/api-campaign/campaigns/${campaignId}/uploadProfilePic?token=${accessToken}`;
  return fileHelper.upload(
    path,
    file,
    'image')
    .then(res => res.data)

}

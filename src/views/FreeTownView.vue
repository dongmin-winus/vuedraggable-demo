<template>
  <div>
    <div
      class="m-4 mt-6 mb-3 relative text-bold text-xl text-bold pb-2 border border-b-gray-200 border-white"
    >
      <div class="right-0 absolute text-sm text-gray-400 rounded">
        편집
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    <FreetownTransition2
      :section="'마을소식'"
      :groupName="'news'"
      v-model="news"
      @deleteClick="deleteFromList"
    />
    <FreetownTransition2
      :section="'마을모임'"
      :groupName="'meetings'"
      v-model="meetings"
      @deleteClick="deleteFromList"
    />
    <FreetownTransition2
      :section="'마을포토'"
      :groupName="'photos'"
      v-model="photos"
      @deleteClick="deleteFromList"
    />
    <div class="flex flex-row justify-center space-x-2 py-4">
      <button
        class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        @click="sendKakaoFeed"
      >
        공유하기(피드)
      </button>
      <button
        class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        @click="sendKakaoList"
      >
        공유하기(리스트)
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FreetownTransition2 from "../components/FreetownTransition2.vue";
// import dataFetchingMixin from '../mixins/dataFetchingMixin.js';
const WEB_URL = process.env.VUE_APP_WEB_URL;
const MOBILE_URL = process.env.VUE_APP_MOBILE_URL;
export default {
  components: {
    FreetownTransition2,
  },
  computed: {
    ...mapGetters(["fetchNews", "fetchMeetings", "fetchPhotos"]),
    news: {
      get() {
        return this.fetchNews;
      },
      set(news) {
        this.UPDATE_NEWS(news);
      },
    },
    meetings: {
      get() {
        return this.fetchMeetings;
      },
      set(meetings) {
        this.UPDATE_MEETINGS(meetings);
      },
    },
    photos: {
      get() {
        return this.fetchPhotos;
      },
      set(photos) {
        this.UPDATE_PHOTOS(photos);
      },
    },
  },
  // mixins: [dataFetchingMixin],
  methods: {
    ...mapActions(["UPDATE_NEWS", "UPDATE_MEETINGS", "UPDATE_PHOTOS"]),
    /**
     * 카카오 공유하기 피드
     */
    sendKakaoFeed() {
      const content = this.fetchContents[0];
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: content.title,
          description: content.date_at,
          imageUrl: "https://picsum.photos/200/300",
          link: {
            mobileWebUrl: `${MOBILE_URL}/myWallet`,
            webUrl: `${WEB_URL}/myWallet`,
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: `${MOBILE_URL}/myWallet`,
              webUrl: `${WEB_URL}/myWallet`,
            },
          },
        ],
      });
    },
    /**
     * 카카오 공유하기 리스트
     */
    sendKakaoList() {
      if (this.fetchContents.length < 2) {
        alert("리스트 공유시 2개 이상의 콘텐츠가 필요합니다.");
        return;
      }
      const listContents = this.fetchContents.slice(0, 3).map((item) => ({
        title: item.title,
        description: item.date_at,
        imageUrl: "https://picsum.photos/200/300",
        link: {
          mobileWebUrl: `${MOBILE_URL}/myWallet`,
          webUrl: `${WEB_URL}/myWallet`,
        },
      }));
      window.Kakao.Share.sendDefault({
        objectType: "list",
        headerTitle: "자유마을 소식",
        headerLink: {
          mobileWebUrl: `${MOBILE_URL}/myWallet`,
          webUrl: `${WEB_URL}/myWallet`,
        },
        contents: [...listContents],
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: `${MOBILE_URL}/myWallet`,
              webUrl: `${WEB_URL}/myWallet`,
            },
          },
        ],
      });
    },
    /**
     * 리스트에서 지우고 스토어 뮤테이션 발생
     */
    deleteFromList(groupName, id) {
      // const newList = this.fetchContents.filter((row) => row.id !== id);
      // this.UPDATE_CONTENTS(newList); //업데이트는 클라이언트 스토어만 변경됨, 서버와 fetching 필요함
      let newList;
      switch (groupName) {
        case "news":
          newList = this.news.filter((row) => row.id !== id);
          this.UPDATE_NEWS(newList);
          break;
        case "meetings":
          newList = this.meetings.filter((row) => row.id !== id);
          this.UPDATE_MEETINGS(newList);
          break;
        case "photos":
          newList = this.photos.filter((row) => row.id !== id);
          this.UPDATE_PHOTOS(newList);
          break;
        default:
          break;
      }
    },
  },
};
</script>

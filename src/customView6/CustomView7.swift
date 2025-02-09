//
//  CustomView7.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView7: View {
    @State public var image3Path: String = "image3_1213687"
    @State public var text6Text: String = "Security"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image3Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 7.368, trailing: 0.108))
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            Text(text6Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 7, y: 3.369)
        }
        .frame(width: 65.108, height: 29.368, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView7_Previews: PreviewProvider {
    static var previews: some View {
        CustomView7()
    }
}
